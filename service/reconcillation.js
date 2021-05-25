const reconcillationDAO = require("../dao/reconcillation");
const readXlsxFile = require("read-excel-file/node");
const moment = require("moment");
const { getJsDateFromExcel } = require("excel-date-to-js");
// do validation
class ReconcillationService {
  async allSubscribers() {
    return await reconcillationDAO.all();
  }
    upload(file) {
    let path =  "./uploads/documents/" + file.filename;
     readXlsxFile(path).then(async (rows) => {
      // skip headers
      rows.shift();
      let existed = [];
      let datas = [];
      for (const row of rows) { 
        let data = {
          value_date:moment(getJsDateFromExcel(row[2])).format('DD-MM-YYYY'),
          remarks: row[4],
          credit_amount: row[3],
        }
        console.log({data})
        const check =   await reconcillationDAO.exist({
          value_date:moment(getJsDateFromExcel(row[2])).format('DD-MM-YYYY'),
          remarks: row[4],
        });
        if (!check) {
          datas.push(data);
        } else {
          existed.push(data);
        }
      }
      
      
    });

  }
  async updateSubscription(subscriptionData) {
    const {
      email,
      status,
      id
    } = subscriptionData;
    return reconcillationDAO.update(id, email, status);
  }
  exist(email) {
    const result = reconcillationDAO.exist(email);
    if (result) {
      return {
        exist: true,
        message: "You already subscribed"
      };
    } else {
      return {
        exist: false,
        message: "Email is available"
      };
    }
  }
  async unsubscribe(id) {
    const result = reconcillationDAO.delSubscription(id);
    if (result) {
      return {
        message: "Subscription deleted successfully"
      };
    } else {
      return {
        message: "Subscription not deleted"
      };
    }
  }
}
module.exports = new ReconcillationService();