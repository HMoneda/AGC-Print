// get user service static object from service folder
import UserService from '../service/user_service.js';
import dotenv from 'dotenv-safe';
import jwt from 'jsonwebtoken';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

dotenv.config();

// index controller object for index controller methods
const indexController = {
  // index controller method to get to login page
  getLogin: (req, res) => {
    return res.json('LOGIN PAGE');
  },
  // index controller method to get to register page
  getRegister: (req, res) => {
    return res.json('REGISTER PAGE');
  },
  // index controller method to get to home page
  getHome: (req, res) => {
    return res.json('HOME PAGE');
  },
  // index controller method to logout user
  getLogout: (req, res) => {
    return res.json('LOGOUT');
  },
  // index controller method to login user
  postLogin: async (req, res) => {
    // temporary username and password values
    const uName = 'JuanKoch';
    const pw = 'lesugokewu';

    // if user data exist in the database
    const user = await UserService.getUser({ username: uName });
    if (user != null) {
      // compare user stored password with the inputted password
      // bcrypt.compare(pw, user.password, function (equal) {
      //   // if password inputted matches the stored password
      //   if (equal) {
      //     const accessToken = jwt.sign(uName, process.env.TOKEN_SECRET);
      //     // send back username to client
      //     return res.json({ accessToken: accessToken });
      //   }
      // });

      // TEMPORARY
      if (pw === user.password) {
        const accessToken = jwt.sign(uName, process.env.TOKEN_SECRET);
        // send back username to client
        return res.json({ accessToken: accessToken });
      }
    }

    // username or password is incorrect, send error message
    const details = {
      error: 'Incorrect username or password',
    };
    return res.json(details);
  },
  // index controller method to register (add) user to the database
  postRegister: async (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      contactNo: req.body.contactNo,
      email: req.body.email,
    };

    // if username already exists in the database
    if (UserService.getUser({ username: user.username })) {
      const details = {
        error: 'Username already exists',
      };
      return res.json(details);
    } else if (UserService.getUser({ email: user.email })) {
      const details = {
        error: 'E-mail already exists',
      };
      return res.json(details);
    } else {
      const user = user;
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash;
        const user = UserService.addUser(user);
        return res.json(user);
      });
    }
  },
};

// export index routes
export default indexController;
