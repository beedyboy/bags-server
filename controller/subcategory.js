const Service = require("../service/subcategory");

class SubCategoryController {
  async getAllData(req, res) { 
    try {
      const result = await Service.allCategories();
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async exist(req, res) { 
    try {
      const { name, category } = req.body;
      const result = await Service.exist(name, category);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async create(req, res) { 
    try {
      const result = await Service.create(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async updateData(req, res) { 
    try {
      const result = await Service.update(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteData(req, res) {  
    try {
      const result = await Service.delRecord(req.query.id);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new SubCategoryController();
