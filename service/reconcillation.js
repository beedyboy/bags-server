const reconcillationDAO = require("../dao/reconcillation");
const readXlsxFile = require("read-excel-file/node");
const moment = require("moment");
const { getJsDateFromExcel } = require("excel-date-to-js");
// do validation
class ReconcillationService {
  async allData() {
    return await reconcillationDAO.all();
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
          credit_amount: row[3],
        };
        const check = await reconcillationDAO.exist({
          value_date: moment(getJsDateFromExcel(row[2])).format("DD-MM-YYYY"),
          remarks: row[4],
        });
        if (!check) {
          datas.push(data);
        } else {
          existed.push(data);
        }
      }
      // console.log({datas})
      if (datas.length > 0) {
        console.log("length", datas.length);
        // lr = { status: 200, message: "Upload was successful"}
        lr = await reconcillationDAO.saveUpload(datas);
      } else {
        lr = { status: 404, message: "Upload was unsuccessful" };
      }
    });
    return lr;
  }
  async firstApproval(data, id) {
    return reconcillationDAO.firstApproval(data, id);
  }
  async secondApproval(data, id) {
    return reconcillationDAO.secondApproval(data, id);
  }
  async overturn(data) {
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
