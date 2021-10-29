const db = require('../db/db');
class SubCategoryDAO {
    
    async exist(name, category) {
        const result = await db("sub_categories").where({name, category});
        if (result.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      all() {
        return db("sub_categories").select();
      }
      findByCategory(category) {
        return db("sub_categories").where({category}).select();
      }
      async create(name, category, slug, description) {
        const id = await db("sub_categories")
          .insert({
            name, category, slug, description
          }); 
        if (id > 0) {
          return { status: 201, message: "Sub Category created successfully", id };
        } else {
          return { status: 404, message: "Sub Category was not created" };
        }
      }
      async update(bid, name, category, slug, description) {
        const id = await db("sub_categories")
          .where("id", bid)
          .update({
            name, category, slug, description
          });
        if (id > 0) {
          return { status: 200, message: "Sub Category record updated successfully", id };
        } else {
          return { status: 404, message: "Sub Category record not updated" };
        }
      }
      async delData(id) { 
          const result = await db("sub_categories").where("id", id).del(); 
        if (result.length > 0) return true;
        return false;
      }
}
module.exports = new SubCategoryDAO();