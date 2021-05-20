const db = require("../db/db");
class SubscriptionDAO {
  async exist(email) {
    const result = await db("subscribers").where("email", email);
    if (result.length > 0) return true;
    return false;
  }
  all() {
    return db("subscribers").select();
  }
  async subscribe(email, status ="Active") {
    
    const [id] = await db("subscribers")
      .insert({
        email, 
        status
      })
      .onConflict('email')
      .merge(['email', 'status', 'updated_at'])
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "You have successfully subscribed to our services", id };
    } else {
      return { status: 404, message: "Subscription failed" };
    }
  }
  async update(bid, email, status) {
    const [id] = await db("subscribers")
      .where("id", bid)
      .update({
        email,
        status,
      }).onConflict('email')
      .merge(['status', 'email', 'updated_at'])
      .returning("id");
    if (id > 0) {
      return { status: 200, message: "Subscription record updated successfully", id };
    } else {
      return { status: 404, message: "Subscription record not updated" };
    }
  }
  async delSubscription(id) {
    const result = await db("subscribers").where("id", id).del()
    if (result.length > 0) return true;
    return false;
  }
}
module.exports = new SubscriptionDAO();
