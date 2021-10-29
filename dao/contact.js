const db = require("../db/db");
class ContactDAO {
  async exist(email) {
    const result = await db("contacts").where("email", email);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("contacts").select();
  }
  async contactus(data) {
    const status = "UnRead";
    const { email, fullname, description, phone } = data;
    const id = await db("contacts")
      .insert({
        email,
        fullname,
        description,
        phone,
        status,
      });
      // .returning("id");
    if (id > 0) {
      return { status: 200, message: "Message delivered successfully", id };
    } else {
      return { status: 404, message: "Contact failed" };
    }
  }
  async update(bid, email, status) {
    const id = await db("contacts")
      .where("id", bid)
      .update({
        email,
        status,
      })
      .onConflict("email")
      .merge(["status", "email", "updated_at"]);
      // .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Contact record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Contact record not updated" };
    }
  }
  async delContact(id) {
    const result = await db("contacts").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new ContactDAO();
