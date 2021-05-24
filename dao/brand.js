const db = require("../db/db");
class BrandDAO {
  async exist(name) {
    const result = await db("brands").where("name", name);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  all() {
    return db("brands").select();
  }
  async createBrand(name, description) {
    const [id] = await db("brands")
      .insert({
        name,
        description,
      })
      .onConflict("name")
      .ignore()
      .returning("id");
    if (id > 0) {
      return { status: 201, message: "Brand created successfully", id };
    } else {
      return { status: 404, message: "Brand was not created" };
    }
  }
  async updateBrand(bid, name, description) {
    const [id] = await db("brands")
      .where("id", bid)
      .update({
        name,
        description,
      })
      .onConflict("name")
      .merge(["description", "name", "updated_at"])
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Brand record updated successfully", id };
    } else {
      return { status: 404, message: "Brand record not updated" };
    }
  }
  async delBrand(id) {
    const result = await db("brands").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new BrandDAO();
