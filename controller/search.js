const Service = require("../service/search");
// do validation
class SearchController {
    
  async recommend(req, res) {
     try {
      const result = await Service.recommend(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    } 
  }
}
module.exports = new SearchController();
