const { multerUploads } = require('../middleware/multer');
const accountService = require("../service/account");
var upload = multerUploads.array('file');
class AccountController {
  async getAllAccounts(req, res) { 
    try {
      const result = await accountService.allAccounts();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async createAccount(req, res) { 
    try {
      const result = await accountService.createAccount(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async updateAccount(req, res) { 
    try {
      const result = await accountService.updateAccount(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async deleteAccount(req, res) { 
    try {
      const result = await accountService.delAccount(req.query.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new AccountController();
