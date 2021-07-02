const DAO = require("../dao/search");
// do validation
class SearchService {
   
  async recommend(data) {
     return await DAO.recommend(data);
  }
}
module.exports = new SearchService();
