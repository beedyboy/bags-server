const db = require("../db/db");
class ReconcillationDAO {
  async exist(data) {
    const result = await db("reconcillations").where(data);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("reconcillations as r")
      .join("accounts as a", "r.approval_one", "=", "a.id")
      .join("accounts as a2", "r.approval_two", "=", "a2.id")
      .select(
        "r.*",
        "a.firstname",
        "a.lastname",
        "a2.firstname",
        "a2.lastname"
      );
  }
  async saveUpload(data) {
    const [id] = await db("reconcillations").insert(data).returning("id");
    if (id > 0) {
      console.log("id is", id);
      return {
        status: 200,
        message: "Account statement uploaded successfully",
        id,
      };
    } else {
      return { status: 404, message: "Upload failed" };
    }
  }
  async firstApproval(data, uid) {
    const { rid, approved_one, amount_used, balance } = data;
    const [id] = await db("reconcillations")
      .where("id", rid)
      .update({
        approved_one,
        amount_used,
        balance,
        approval_one: uid,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Record not updated" };
    }
  }
  async secondApproval(data, uid) {
    const { rid, approved_two } = data;
    const [id] = await db("reconcillations")
      .where("id", rid)
      .update({
        approved_two,
        approval_two: uid,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Record updated successfully",
        id,
      };
    } else {
      return { status: 404, message: "Record not updated" };
    }
  }
  async overturn(data) {
    const { rid, approved_one, approved_two, amount_used, balance } = data;
    const [id] = await db("reconcillations")
      .where("id", rid)
      .update({
        amount_used,
        balance,
        approved_one,
        approved_two,
      })
      .returning("id");
    if (id > 0) {
      return {
        status: 200,
        message: "Record overturned successfully",
        id,
      };
    } else {
      return { status: 404, message: "Record not overturned" };
    }
  }
  async delRecord(id) {
    const result = await db("reconcillations").where("id", id).del();
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new ReconcillationDAO();
