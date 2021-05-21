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
  async createProduct(name, description) {
    const [id] = await db("products")
      .insert({
        name,
        description,
      })
      .onConflict('name')
      .ignore()
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Product created successfully", id };
    } else {
      return { status: 404, message: "Product was not created" };
    }
  }
  async updateProduct(bid, name, description) {
    const [id] = await db("products")
      .where("id", bid)
      .update({
        name,
        description,
      }).onConflict('name')
      .merge(['description', 'name', 'updated_at'])
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Product record updated successfully", id };
    } else {
      return { status: 404, message: "Product record not updated" };
    }
  }
  async delProduct(id) {
    const result = await db("products").where("id", id).del()
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new ProductDAO();
