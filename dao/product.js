const db = require("../db/db");
class ProductDAO {
  async exist(name) {
    const result = await db("products").where("name", name);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db
      .from("products as p")
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .select("p.*", "b.name as brandName", "s.name as subName");
  }

  filterProduct(data) { 
    return db
      .from("products as p")
      .where(data)
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .select("p.*", "b.name as brandName", "s.name as subName");
 
  }

  getProductById(id) {
    return db
      .from("products as p")
      .where('p.id', id)
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .first("p.*", "b.name as brandName", "s.name as subName");
  }

  getProductByName(name) {
    return db
      .from("products as p")
      .where('p.product_name', name)
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .first("p.*", "b.name as brandName", "s.name as subName");
  }

  getProductByCategory(category) {
    return db 
      .from("products as p")
      .where('p.category', category)
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .select("p.*", "b.name as brandName", "s.name as subName");
     
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
      return { status: 201, message: "Product created successfully", id };
    } else {
      return { status: 404, message: "Product was not created" };
    }
  }
  async updateProduct(
    bid,
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
