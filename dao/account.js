const db = require("../db/db");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
class AccountDAO {
  async exist(email) {
    const result = await db("accounts").where({ email });
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("accounts").select();
  }
  async createAccount(data) {
    const {
      email,
      firstname,
      lastname,
      username,
      address,
      phone,
      password,
    } = data;
    const newPwd = await hash(password, Number(process.env.SECRET));
    const [id] = await db("accounts")
      .insert({
        email,
        firstname,
        lastname,
        username,
        address,
        phone,
        password: newPwd,
      })
      .returning("id");
    if (id > 0) {
      return { status: 201, message: "Account created successfully", id };
    } else {
      return { status: 404, message: "Account was not created" };
    }
  }

  async updateAccount(
    uid,
    email,
    firstname,
    lastname,
    username,
    address,
    phone
  ) {
    const [id] = await db("accounts")
      .where("id", uid)
      .update({
        email,
        firstname,
        lastname,
        username,
        address,
        phone,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Account record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Account record not updated" };
    }
  }
  async delAccount(id) {
    const result = await db("accounts").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
  async auth(data) {
    try {
      const { email, password } = data;
      const user = await db("accounts").where({ email });
      if (!user) {
        return { status: 404, error: "user doesn't exist" };
      }
      console.log({ user });
      const check_password = await compare(password, user.password);
      if (!check_password) {
        return { status: 401, error: "email or password dont match" };
      }
      const token = await sign({ id: user.id }, `${process.env.SECRET_KEY}`);
      const [id] = await db("accounts")
        .where("id", uid)
        .update({
          token,
        })
        .returning("id");
      if (id > 0) {
        return {
          status: 201,
          message: "Login successful",
          firstname: user.firstname,
          lastname: user.lastname,
          acl: user.roles[0],
          token,
        };
      } else {
        return { status: 404, message: "Error getting account information" };
      }
    } catch (error) {
      return { status: 401, error: "email or password dont match" };
    }
  }
}
module.exports = new AccountDAO();