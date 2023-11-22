const Database = require("../../config/database");

const bcrypt = require("bcrypt");

class AccountController {
  constructor() {
    this.db = Database;
  }

  getUser = async (req, res) => {
    try {
      const user = req.session.user || {};
      if (user) {
        res.status(200).json({
          status: true,
          user: user,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };
}

module.exports = new AccountController();
