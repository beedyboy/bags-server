const { multerUploads } = require('../middleware/multer');
const productService = require("../service/product");
var upload = multerUploads.array('file');
class ProductController {
  async getAllProducts(req, res) { 
    try {
      const result = await productService.allProducts();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async getProductById(req, res) { 
    try { 
      const result = await productService.getProductById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async getProductByName(req, res) { 
    try { 
      const result = await productService.getProductByName(req.params.name);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async getProductByCategory(req, res) { 
    try {
      const result = await productService.getProductByCategory(req.params.name);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  createProduct(req, res) { 
    upload(req, res, async (err) => {
      if(err){
        res.json({
          message: "error uploading product",
          err
        })
      } else {
        var files = req.files;   
        let images = [];
        var count = 0;
    for (let index = 0; index < files.length; index++) {
      const element = files[index].filename; 
      images.push(element);
      count +=1;
    }
    if(count === files.length) {
      try { 
        const result = await productService.createProduct(req.body, images);
        res.status(result.status).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json("something went wrong");
      }

    }
      }
    })
  }
  async updateProduct(req, res) { 
    try {
      const result = await productService.updateProduct(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteProduct(req, res) { 
    try {
      const result = await productService.delProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new ProductController();
