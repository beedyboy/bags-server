const moment = require("moment");

const Assistant = {
  generateSlug: (data) => {
    let slug = data
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
    return slug;
  },
  getDaysDiff: (start_date, end_date, date_format = "YYYY-MM-DD") => {
    const getDateAsArray = (date) => {
      return moment(date.split(/\D+/), date_format);
    };
    return (
      getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1
    );
  },
  getRandomizer: (bottom, top) => {
    return function () {
      return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    };
  },
  generateOTP: () => {
    var rollDie = Assistant.getRandomizer(0, 9);

    var results = "";
    for (var i = 0; i < 7; i++) {
      results += rollDie() + " "; //make a string filled with 1000 random numbers in the range 1-6.
    }
    return results;
  },
  useDate: () => {
    const today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var dd = String(today.getDate()).padStart(2, "0");
    return today.getFullYear() + "/" + mm + "/" + dd;
  },
};

module.exports = Assistant;
