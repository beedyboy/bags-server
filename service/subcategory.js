const DAO = require("../dao/subcategory");
const slugify = require('slugify')
// do validation
class SubCategoryService {
  async allCategories() {
    return await DAO.all();
  }
  async exist(name, category) {
    const result = await DAO.exist(name, category);  
    if (result) {
      return { exist: true, message: "Sub Category already exist", result };
    } else {
      return { exist: false, message: "Sub Category is available" };
    }
  }
  async create(data) {
    const { name, category, description } = data;
    const check = await DAO.exist(name, category);
    if (!check) {
      const slug = slugify(name, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
      })
      // console.log({slug}) 
      return DAO.create(name, category, slug, description);
    } else {
      return { exist: true, message: "Sub Category already exist" };
    }
  }
  async update(data) {
    const { name, category, description, id } = data; 
     const slug = slugify(name, {
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false,      // convert to lower case, defaults to `false`
      strict: false,     // strip special characters except replacement, defaults to `false`
      locale: 'vi'       // language code of the locale to use
    })
    return DAO.update(id, name, category, slug, description);
  } 
  async delRecord(id) {
    const result = DAO.delData(id);
    if (result) {
      return { message: "Sub Category deleted successfully" };
    } else {
      return { message: "Sub Category not deleted" };
    }
  }
}
module.exports = new SubCategoryService();
