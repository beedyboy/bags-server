const Service = require("../service/reconcillation");

class ReconcillationController {
  async uploadStatement(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }  
      const result = await Service.performUpload(req.file);
      console.log({result})
      res.status(result.status).json(result);
    } catch (error) {
      console.error({error});
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
module.exports = new ReconcillationController();
