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
  async createProduct(req, res) { 
    upload(req, res, (err) => {
      if(err){
        res.json({
          msg: "error uploading product",
          err
        })
      } else {
        var files = req.files;  
        let images = [];
        var count = 0;
    for (let index = 0; index < files.length; index++) {
      const element = files[index].filename;
      images.push(element);
      console.log({element})
      count +=1;
    }
    if(count + 1 === files.length) {
      try {
        const result = await productService.createProduct(req.body, images);
        res.status(201).json(result);
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
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteProduct(req, res) { 
    try {
      const result = await productService.delProduct(req.query.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new ProductController();
