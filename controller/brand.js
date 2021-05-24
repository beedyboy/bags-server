const brandService = require("../service/brand");

class BrandController {
  async getAllBrands(req, res) { 
    try {
      const result = await brandService.allBrands();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async exist(req, res) { 
    try {
      const result = await brandService.exist(req.body.name);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async createBrand(req, res) { 
    try {
      const result = await brandService.createBrand(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async updateBrand(req, res) { 
    try {
      const result = await brandService.updateBrand(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteBrand(req, res) { 
    try { 
      const result = await brandService.delBrand(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new BrandController();
