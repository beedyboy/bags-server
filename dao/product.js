const db = require("../db/db");
class ProductDAO {
  async exist(name) {
    const result = await db("products").where("name", name);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("products").select();
  }
  async createProduct(
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
  ) {
    const [id] = await db("products")
      .insert({
        product_name,
        category,
        sub_id,
        brand_id,
        images,
        branded,
        best,
        arrival,
        featured,
        description,
      })
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Product created successfully", id };
    } else {
      return { status: 404, message: "Product was not created" };
    }
  }
  async updateProduct(
    bid,
    product_name,
    category,
    sub_id,
    brand_id,
    branded,
    best,
    arrival,
    featured,
    description
  ) {
    const [id] = await db("products")
      .where("id", bid)
      .update({
        product_name,
        category,
        sub_id,
        brand_id,
        branded,
        best,
        arrival,
        featured,
        description,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Product record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Product record not updated" };
    }
  }
  async delProduct(id) {
    const result = await db("products").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new ProductDAO();
