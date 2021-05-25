const Service = require("../service/reconcillation");
const readXlsxFile = require("read-excel-file/node");

class UploadController {
   
  async uploadStatement(req, res) { 
    try {
      if(req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      const result = await Service.upload(req.file);
      res.status(201).json(result);
      // let path = __basedir + "/uploads/" + req.file.filename;
      // readXlsxFile(path).then((rows) => {
      //   // skip headers
      //   rows.shift();
      //   let datas = [];

      //   rows.forEach((row) => {
      //     // before pushing, check for duplicate date 
      //     let data = {
      //       value_date: row[1],
      //       remark: row[2],
      //     }
      //     datas.push(data);
      //   });
      // });
      // console.log({datas})

    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
      // res.status(500).json({message: "Fail to import data into database!",
      // error: error.message,});
    }
  }
  async update(req, res) { 
    try {
      const result = await Service.updateSubscription(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async unsubscribe(req, res) { 
    try {
      const result = await Service.unsubscribe(req.query.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new UploadController();
