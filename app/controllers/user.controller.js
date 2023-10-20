require("dotenv").config();
var nodemailer = require("nodemailer");
const ejs = require("ejs");
const { validationResult } = require("express-validator");
const { Sequelize, Op } = require("sequelize");

const db = require("../models"); // models path
const { user, post } = db;

const responseCode = require("../utils/responseStatus");
const responseObj = require("../utils/responseObjects");
const constants = require("../utils/constants");
const uploadFile = require("../utils/uploadFile");
const helperFunctions = require("../utils/helperFunctions")

// find user logic
exports.findUser = (data) => {
  return new Promise((resolve, reject) => {
    user.findAll({
      where: { email: data },
      attributes: {
        exclude: ["created_at", "updated_at", "is_testdata", "is_delete"]
      }
    }).then((result) => {
      try {
        if (result && result.length > 0) {
          resolve({
            status: 1,
            message: "data found",
            data: result,
          });
        } else {
          // resolve(0);
          resolve({ status: 2, message: "No data found" });
        }
      } catch (err) {
        resolve({
          status: 0,
          message: "Error occurred while fetching User",
        });
      }
    });
  });
};

exports.findUserById = (data) => {
  return new Promise((resolve, reject) => {
    user.findAll({ where: { id: data }, attributes: { exclude: ["created_at", "updated_at", "is_testdata", "is_delete"] } }).then((result) => {
      try {
        if (result) {
          resolve({
            status: 1,
            message: "data found",
            data: result,
          });
        } else {
          resolve(0);
          resolve({ status: 2, message: "No data found" });
        }
      } catch (err) {
        resolve({
          status: 0,
          message: "Error occurred while fetching User",
        });
      }
    });
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "narolaios@gmail.com",
    pass: "feksopjnxvwbbzgf",
  },
});

// send mail logic
exports.sendMail = async (template_name, options, data) => {
  return new Promise((resolve, reject) => {
    let emailTemplate;
    ejs
      .renderFile(constants.TEMPLATE_PATHS.FORGOT_PASS, {
        reset_link: options.reset_link,
        user_name: options.user_name,
      })
      .then((result) => {
        emailTemplate = result;
        const mailOptions = {
          from: "narolaios@gmail.com", // sender address
          to: options.to, // list of receivers
          subject: options.subject, // Subject line
          html: emailTemplate, // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            resolve({ status: 0, error: error });
          } else {
            resolve({ status: 1, message: info });
          }
        });
      });
  });
};

exports.sendVerificationMail = async (options, data) => {
  return new Promise((resolve, reject) => {
    let emailTemplate;
    ejs
      .renderFile(constants.TEMPLATE_PATHS.VERIFY_EMAIL, {
        verify_link: options.verify_link,
        user_name: options.user_name,
        email: options.email,
      })
      .then((result) => {
        emailTemplate = result;
        const mailOptions = {
          from: "narolaios@gmail.com", // sender address
          to: options.to, // list of receivers
          subject: options.subject, // Subject line
          html: emailTemplate, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            resolve({ status: 0, error: error });
          } else {
            resolve({ status: 1, message: info });
          }
        });
      })
      .catch((err) => {
        console.log("sendVerificationMail Error: ", err);
      });
  });
};

// APIS
exports.getUserProfile = async (req, res) => {
  try {
    // if (!req.body) {
    //   res.status(responseCode.BADREQUEST).send(responseObj.failObject("Content cannot be empty!"))
    //   return;
    // }

    if (!req.decoded) {
      res.status(responseCode.UNAUTHORIZEDREQUEST).send(responseObj.failObject("You are unauthorized to access this api! Please check the authorization token."));
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject(errors?.errors[0]?.msg));
      return;
    }

    const decoded = req?.decoded;

    const data = await user.findAll({
      where: { id: decoded?.id, is_delete: 0 },
      attributes: ['id', 'user_name', 'email', 'profile']
    })

    const no_posts = await post.count({ where: { user_id: decoded?.id, is_delete: 0 } });

    const returnData = {
      ...data[0]?.dataValues,
      postsCount: no_posts
    }

    if (data?.length > 0) {
      res.status(responseCode.OK).send(responseObj.successObject(null, returnData))
    } else {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("Something went wrong!"))
    }
  } catch (err) {
    res.status(responseCode.BADREQUEST).send(responseObj.failObject(err?.message, err))
  }
}

exports.getUserPosts = async (req, res) => {
  try {
    // if (!req.body) {
    //   res.status(responseCode.BADREQUEST).send(responseObj.failObject("Content cannot be empty!"))
    //   return;
    // }

    if (!req.decoded) {
      res.status(responseCode.UNAUTHORIZEDREQUEST).send(responseObj.failObject("You are unauthorized to access this api! Please check the authorization token."));
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject(errors?.errors[0]?.msg));
      return;
    }

    const decoded = req?.decoded;

    const posts = await post.findAll({
      where: { user_id: decoded?.id, is_delete: 0 },
      attributes: {
        exclude: ['user_id', 'is_delete', 'is_testdata', 'created_at', 'updated_at'],
      }
    })

    if (posts?.length > 0) {
      res.status(responseCode.OK).send(responseObj.successObject(null, posts))
    } else {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("No posts for user!"))
    }
  } catch (err) {
    res.status(responseCode.BADREQUEST).send(responseObj.failObject(err?.message, err))
  }
}

exports.updateProfile = async (req, res) => {
  try {
    if (!req?.body) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("Content is required"))
      return;
    }

    if (!req.decoded) {
      res.status(responseCode.UNAUTHORIZEDREQUEST).send(responseObj.failObject("You are unauthorized to access this api! Please check the authorization token."));
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject(errors?.errors[0]?.msg));
      return;
    }

    const decoded = req?.decoded;

    let updated_user = {};
    let img;
    if (req.files['profile']) {
      img = (await uploadFile(req, res))[0]?.name
    }

    if (img) {
      updated_user["profile"] = img;
    }

    if (req.body?.name) {
      updated_user['user_name'] = req.body?.name
    }

    if (updated_user) {
      const data = await user.update(updated_user, { where: { id: decoded?.id, is_delete: 0 } });

      if (data) {
        res.status(responseCode.OK).send(responseObj.successObject())
      } else {
        res.status(responseCode.BADREQUEST).send(responseObj.failObject("Something went wrong updating the user profile!"))
      }
    } else {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("Something went wrong! No data to update."))
    }
  } catch (err) {
    res.status(responseCode.BADREQUEST).send(responseObj.failObject(err?.message, err))
  }
}

exports.changePassword = async (req, res) => {
  try {
    if (!req?.body) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("Content is required"))
      return;
    }

    if (!req.decoded) {
      res.status(responseCode.UNAUTHORIZEDREQUEST).send(responseObj.failObject("You are unauthorized to access this api! Please check the authorization token."));
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject(errors?.errors[0]?.msg));
      return;
    }

    const decoded = req?.decoded;

    const user_data = await this.findUserById(decoded?.id);

    if (user_data?.status == 1) {
      const is_password_verified = helperFunctions.verifyPassword(req.body?.old_password, user_data?.data[0]?.password);
      if (is_password_verified) {
        const new_password = helperFunctions.hashPassword(req.body?.new_password);

        const data = await user.update({ password: new_password }, { where: { id: decoded?.id } });

        if (data[0] == 1) {
          res.status(responseCode.OK).send(responseObj.successObject())
        } else {
          res.status(responseCode.BADREQUEST).send(responseObj.failObject("Something went wrong updating the password!"))
        }
      } else {
        res.status(responseCode.BADREQUEST).send(responseObj.failObject("Incorrect Password!"))
      }
    } else {
      res.status(responseCode.BADREQUEST).send(responseObj.failObject("No such user found!"))
    }

  } catch (err) {
    res.status(responseCode.BADREQUEST).send(responseObj.failObject(err?.message, err))
  }
}