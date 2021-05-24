const brandDAO = require("../dao/brand");
// do validation
class BrandService {
  async allBrands() {
    return await brandDAO.all();
  }
  async createBrand(brandData) {
    const { name, description } = brandData;
    const check = await brandDAO.exist(name);
    if (!check) {
      return brandDAO.createBrand(name, description);
    } else {
      return { exist: true, message: "Brand already exist" };
    }
  }
  async updateBrand(brandData) {
    const { name, description, id } = brandData;
    return brandDAO.updateBrand(id, name, description);
  }
  async exist(name) {
    const result = await brandDAO.exist(name);
    console.log({ result });
    if (result) {
      return { exist: true, message: "Brand already exist" };
    } else {
      return { exist: false, message: "Brand is available" };
    }
  }
  async delBrand(id) { 
    const result = brandDAO.delBrand(id);
    if (result) {
      return { message: "Brand deleted successfully" };
    } else {
      return { message: "Brand not deleted" };
    }
  }
}
module.exports = new BrandService();
