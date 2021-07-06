const Service = require("../service/contact");

class ContactController {
  async getAllMessages(req, res) { 
    try {
      const result = await Service.allMessages();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async contactus(req, res) { 
    try {
      const result = await Service.contactus(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async update(req, res) { 
    try {
      const result = await Service.updateContact(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
  async remove(req, res) { 
    try {
      const result = await Service.remove(req.query.id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json("something went wrong");
    }
  }
}
module.exports = new ContactController();
