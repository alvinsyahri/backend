const User = require('../../model/User');
const bycryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    validateLogin : (req, res) =>{
      const { username, password } = req.body;
      if( username === undefined || username === "" || password === undefined || password === ""){
        res.status(400).json({ msg: "Invalid Data"})
      }
      next();
    },

    actionLogin : async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username: username });
          if (!user) {
            res.json({Login: false});
          }
          const isPasswordMatch = await bycryptjs.compare(password, user.password);
          if (!isPasswordMatch) {
            res.json({Login: false});
          }
          
          const data = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
          }

          const token = jwt.sign(data, "12321kamsda-123nasda-12", {expiresIn: '1d'});
          res.cookie('token', token);
          res.json({Login: true, username: req.session.username, isAdmin: user.isAdmin});
    
        } catch (error) {
          
        }
      },
    
      actionLogout : (req, res) => {
        res.clearCookie('token').json({valid: false})
      },
}