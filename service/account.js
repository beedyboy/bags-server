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
      return { status: 200, exist: true, message: "Email already exist" };
    }
  }
  async updateAccount(accountData) {
    return accountDAO.updateAccount(accountData);
  }
  async updateProfile(accountData, id) {
    return accountDAO.updateProfile(accountData, id);
  }

  async myProfile(id) {
    return await accountDAO.myProfile(id);
    
  }
  async setRoles(accountData) {
    return accountDAO.setRoles(accountData);
  }
  async exist(email) {
    const result = await accountDAO.exist(email);
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
