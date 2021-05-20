const subscriptionDAO = require("../dao/subscription");
// do validation
class SubscriptionService {
  async allSubscribers() {
    return await subscriptionDAO.all();
  }
  async createSubscription(subscriptionData) {
    const { email } = subscriptionData;
    const check = await subscriptionDAO.exist(email);
    if (!check) {
      return subscriptionDAO.subscribe(email);
    } else {
      return subscriptionDAO.subscribe(email, "Active");
    }
  }
  async updateSubscription(subscriptionData) {
    const { email, status, id } = subscriptionData;
    return subscriptionDAO.update(id, email, status);
  }
  exist(email) {
    const result = subscriptionDAO.exist(email);
    if (result) {
      return { exist: true, message: "You already subscribed" };
    } else {
      return { exist: false, message: "Email is available" };
    }
  }
  async unsubscribe(id) {
    const result = subscriptionDAO.delSubscription(id);
    if (result) {
      return { message: "Subscription deleted successfully" };
    } else {
      return { message: "Subscription not deleted" };
    }
  }
}
module.exports = new SubscriptionService();
