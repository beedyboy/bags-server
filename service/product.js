const productDAO = require("../dao/product");
const shortid = require("short-id");
// do validation
class ProductService {
  async allProducts() {
    return await productDAO.all();
  }
  async createProduct(productData, images) {
    const {
      category,
      sub_id,
      brand_id,
      branded,
      best,
      arrival,
      featured,
      description,
    } = productData;
    const product_name = await shortid.generate();
    return productDAO.createProduct(
      product_name,
      category,
      sub_id,
      brand_id,
      images,
      branded,
      best,
      arrival,
      featured,
      description
    );
  }
  async updateProduct(productData) {
    const { name, description, id } = productData;
    return productDAO.updateProduct(id, name, description);
  }
  exist(name) {
    const result = productDAO.exist(name);
    if (result) {
      return { exist: true, message: "Product already exist" };
    } else {
      return { exist: false, message: "Product is available" };
    }
  }
  async delProduct(id) {
    const result = productDAO.delProduct(id);
    if (result) {
      return { message: "Product deleted successfully" };
    } else {
      return { message: "Product not deleted" };
    }
  }
}
module.exports = new ProductService();
