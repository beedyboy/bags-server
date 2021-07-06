const contactDAO = require("../dao/contact");
// do validation
class ContactService {
  async allMessages() {
    return await contactDAO.all();
  }
  async contactus(contactData) {
    return contactDAO.contactus(contactData);
  }
  async updateContact(contactData) {
    const { email, status, id } = contactData;
    return contactDAO.update(id, email, status);
  } 
  async remove(id) {
    const result = contactDAO.delContact(id);
    if (result) {
      return { message: "Contact message deleted successfully" };
    } else {
      return { message: "Contact message not deleted" };
    }
  }
}
module.exports = new ContactService();
