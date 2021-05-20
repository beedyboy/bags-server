const Service = require("../service/subscription");

class SubscriberController {
  async getAllSubscribers(req, res) { 
    try {
      const result = await Service.allSubscribers();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async subscribe(req, res) { 
    try {
      const result = await Service.createSubscription(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async update(req, res) { 
    try {
      const result = await Service.updateSubscription(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async unsubscribe(req, res) { 
    try {
      const result = await Service.unsubscribe(req.query.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new SubscriberController();
