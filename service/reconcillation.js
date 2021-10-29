const reconcillationDAO = require("../dao/reconcillation");
const readXlsxFile = require("read-excel-file/node");
const moment = require("moment");
const { getJsDateFromExcel } = require("excel-date-to-js");
// do validation
class ReconcillationService {
  async allData() {
    return await reconcillationDAO.all();
  }

  async filterRecord(key, value) {
    let data = {};
    if (key === "approved_one") {
      data = { approved_one: value };
    }
    if (key === "approved_two") {
      data = { approved_one: true, approved_two: value };
    }
    return await reconcillationDAO.filterRecord(data);
  }

  async finalReport(data) {
    return await reconcillationDAO.finalReport(data);
  }
  async performUpload(file) {
    let lr;
    let path = "./uploads/documents/" + file.filename;
    await readXlsxFile(path).then(async (rows) => {
      // skip headers
      let existed = [];
      let datas = [];
      rows.shift();
      for (const row of rows) {
        let data = {
          value_date: moment(getJsDateFromExcel(row[2])).format("DD-MM-YYYY"),
          remarks: row[4],
          credit_amount: row[3] || 0,
        };
        const check = await reconcillationDAO.exist({
          value_date: moment(getJsDateFromExcel(row[2])).format("DD-MM-YYYY"),
          remarks: row[4] || "N/A",
        });
        if (!check) {
          datas.push(data);
        } else {
          existed.push(data);
        }
      }
      // console.log({datas})
      if (datas.length > 0) {
        // console.log("length", datas.length);
        // lr = { status: 200, message: "Upload was successful"}
        lr = await reconcillationDAO.saveUpload(datas);
      } else {
        lr = { status: 404, message: "Upload was unsuccessful" };
      }
    });
    return lr;
  }
  async firstApproval(data, id) {
    const result = await reconcillationDAO.max("reference");
    if (result.length > 0) {
      const reference = result[0].total !== null ? parseInt(result[0].total) + 1 : 1; 
      data.reference = String(reference).padStart(7, "0");
    }
    if (data.amount_used !== data.credit_amount) {
      data.approved_one = false;
      data.reconcile_date_one = null;
    } else {
      data.reconcile_date_one = moment().format("DD-MM-YYYY");
    }
    return reconcillationDAO.firstApproval(data, id);
  }
  async secondApproval(data, id) {
    data.reconcile_date_two = moment().format("DD-MM-YYYY");
    return reconcillationDAO.secondApproval(data, id);
  }
  async overturn(data) {
    const result = await reconcillationDAO.max("cancellation_number");
    if (result.length > 0) {
      const cancellation_number =
        result[0].total !== null ? parseInt(result[0].total) + 1 : 1;
      data.cancellation_number = String(cancellation_number).padStart(7, "0");
    }
    data.balance = null;
    data.amount_used = null;
    data.reconcile_date_one = null;
    data.reconcile_date_two = null;
    data.cancellation_date = moment().format("DD-MM-YYYY");
    return reconcillationDAO.overturn(data);
  }
  async delRecord(id) {
    const result = reconcillationDAO.delRecord(id);
    if (result) {
      return {
        message: "Record deleted successfully",
      };
    } else {
      return {
        message: "Record not deleted",
      };
    }
  }
}
module.exports = new ReconcillationService();
