const db = require('../db/db');
class SubCategoryDAO {
    
    async exist(name, category) {
        const result = await db("subcategories").where({name, category});
        if (result.length > 0) return true;
        return false;
      }
      all() {
        return db("subcategories").select();
      }
      async create(name, category, slug, description) {
        const [id] = await db("subcategories")
          .insert({
            name, category, slug, description
          }) 
          .returning("id");
        if (id > 0) {
          return { status: 200, message: "Sub Category created successfully", id };
        } else {
          return { status: 404, message: "Sub Category was not created" };
        }
      }
      async update(bid, name, category, slug, description) {
        const [id] = await db("subcategories")
          .where("id", bid)
          .update({
            name, category, slug, description
          })
          .returning("id");
        if (id > 0) {
          return { status: 200, message: "Sub Category record updated successfully", id };
        } else {
          return { status: 404, message: "Sub Category record not updated" };
        }
      }
      async delData(id) { 
          const result = await db("subcategories").where("id", id).del(); 
        if (result.length > 0) return true;
        return false;
      }
}
module.exports = new SubCategoryDAO();