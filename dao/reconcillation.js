const db = require("../db/db");
class ReconcillationDAO {
  async exist(data) {
    const result = await db("reconcillations").where(data);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("reconcillations").select();
  }
  async saveUpload(data) {
    const [id] = await db("reconcillations").insert(data).returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Account statement uploaded successfully",
        id,
      };
    } else {
      return { status: 404, message: "Upload failed" };
    }
  }
  async update(bid, email, status) {
    const [id] = await db("reconcillations")
      .where("id", bid)
      .update({
        email,
        status,
      })
      .onConflict("email")
      .merge(["status", "email", "updated_at"])
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Subscription record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Subscription record not updated" };
    }
  }
  async delSubscription(id) {
    const result = await db("reconcillations").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new ReconcillationDAO();
