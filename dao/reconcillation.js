const db = require("../db/db");
class ReconcillationDAO {
  all() {
    return db
      .from("reconcillations as r")
      .leftOuterJoin("accounts as a1", function () {
        this.on("r.approval_one", "=", "a1.id");
      })
      .leftOuterJoin("accounts as a2", function () {
        this.on("r.approval_two", "=", "a2.id");
      })
      .select(
        "r.*",
        "a1.firstname as ap1first",
        "a1.lastname as ap1last",
        "a2.firstname as ap2first",
        "a2.lastname as ap2last"
      );
  }
  filterRecord(data) { 
    return db
      .from("reconcillations as r")
      .where(data)
      .leftOuterJoin("accounts as a1", function () {
        this.on("r.approval_one", "=", "a1.id");
      })
      .leftOuterJoin("accounts as a2", function () {
        this.on("r.approval_two", "=", "a2.id");
      })
      .select(
        "r.*",
        "a1.firstname as ap1first",
        "a1.lastname as ap1last",
        "a2.firstname as ap2first",
        "a2.lastname as ap2last"
      );
  }
  async exist(data) {
    const result = await db("reconcillations").where(data);
    if (result.length > 0) return true;
    return false;
  }
  async saveUpload(data) {
    const [id] = await db("reconcillations").insert(data).returning("id");
    if (id > 0) {
      console.log("id is", id);
      return {
        status: 201,
        message: "Account statement uploaded successfully",
        id,
      };
    } else {
      return { status: 404, message: "Upload failed" };
    }
  }
  async firstApproval(data, uid) {
    const { id: rid, approved_one, amount_used, balance, reference } = data;
    const [id] = await db("reconcillations")
      .where("id", rid)
      .update({
        approved_one,
        amount_used,
        balance,
        reference,
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
    const { id: rid, approved_two } = data;
    console.log({approved_two})
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
    const { id: rid, approved_one, approved_two, amount_used, balance } = data;
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
