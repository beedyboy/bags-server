const accountService = require("../service/account");
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
  async setRoles(req, res) {
    try {
      const result = await accountService.setRoles(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async exist(req, res) { 
    try {
      const result = await accountService.exist(req.body.email);
      res.status(200).json(result);
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
      const result = await accountService.delAccount(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async auth(req, res) {
    try {
      const result = await accountService.auth(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new AccountController();
