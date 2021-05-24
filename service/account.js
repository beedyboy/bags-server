const accountDAO = require("../dao/account");
// do validation
class AccountService {
  async allAccounts() {
    return await accountDAO.all();
  }
  async createAccount(accountData) {
    const { email } = accountData;
    const check = await accountDAO.exist(email);
    if (!check) {
      return accountDAO.createAccount(accountData);
    } else {
      return { exist: true, message: "Email already exist" };
    }
  }
  async updateAccount(accountData) {
    const { name, description, id } = accountData;
    return accountDAO.updateAccount(id, name, description);
  }
  exist(email) {
    const result = accountDAO.exist(email);
    if (result) {
      return { exist: true, message: "Account already exist" };
    } else {
      return { exist: false, message: "Account is available" };
    }
  }
  async auth(data) {
   return await accountDAO.auth(data); 
  }
  async delAccount(id) {
    const result = accountDAO.delAccount(id);
    if (result) {
      return { message: "Account deleted successfully" };
    } else {
      return { message: "Account not deleted" };
    }
  }
}
module.exports = new AccountService();
