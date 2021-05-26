const Service = require("../service/reconcillation");

class ReconcillationController {
  async getAllRecord(req, res) {
    try {
      const result = await Service.allData();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async filterRecord(req, res) {
    try {
      const { key, value }  = req.params; 
      const result = await Service.filterRecord(key, value);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async uploadStatement(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      const result = await Service.performUpload(req.file);
      console.log({ result });
      res.status(result.status).json(result);
    } catch (error) {
      console.error({ error });
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
      // res.status(500).json({message: "Fail to import data into database!",
      // error: error.message,});
    }
  }
  async firstApproval(req, res) {
    try {
      const { userId } = req;
      const result = await Service.firstApproval(req.body, userId);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async secondApproval(req, res) {
    try {
      const { userId } = req;
      const result = await Service.secondApproval(req.body, userId);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async overturn(req, res) {
    try {
      const result = await Service.overturn(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async delRecord(req, res) {
    try {
      const result = await Service.delRecord(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new ReconcillationController();
