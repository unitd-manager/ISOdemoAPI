const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/Database.js");
const userMiddleware = require("../middleware/UserModel.js");
var md5 = require("md5");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
const mime = require("mime-types");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.get('/getScoreManage', (req, res, next) => {
  db.query(`Select s.*, a.company_name
  From score_management s
          LEFT JOIN (company a) ON (a.company_id = s.company_id)

  Where s.score_management_id !=''`,
    (err, result) => {
      if (err) {
        console.log('error: ', err)
        return res.status(400).send({
          data: err,
          msg: 'failed',
        })
      } else {
        return res.status(200).send({
          data: result,
          msg: 'Success',

            });

        }
 
    }
  );
});

app.post("/getScoreHistory", (req, res, next) => {
  db.query(
    `Select 
    c.*,
    a.question
    FROM score_management_history c
  LEFT JOIN (question_management a) ON (a.question_management_id = c.question_id)
   WHERE c.score_management_id = ${db.escape(req.body.score_management_id)} `,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result,
        });
      }
    });
  });
app.post("/getScoreManageById", (req, res, next) => {
  db.query(
    `Select 
    c.*
    ,a.company_name
    FROM score_management c
        LEFT JOIN (company a) ON (a.company_id = c.company_id)
   WHERE c.score_management_id = ${db.escape(req.body.score_management_id)} `,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result,
        });
      }
    });
  });
app.get("/getModuleDropdown", (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: "1", name: "DashBoard" },
      { id: "2", name: "Opportunity" },
      { id: "3", name: "Project" },
      { id: "4", name: "Client" },
      { id: "5", name: "Booking" },
      { id: "6", name: "Timesheet" },
      { id: "7", name: "Product" },
      { id: "8", name: "Supplier" },
      { id: "9", name: "Accounts" },
      { id: "10", name: "Expense Head" },
      { id: "11", name: "Sub Con" },
      { id: "12", name: "Finance" },
      { id: "13", name: "Invoice" },
      { id: "14", name: "Inventory" },
      { id: "15", name: "Purchase Order" },
      { id: "16", name: "Reports" },
      { id: "17", name: "Vehicle" },
      { id: "18", name: "Leave" },
      { id: "19", name: "Loan" },
      { id: "20", name: "Training" },
      { id: "21", name: "Employee" },
      { id: "22", name: "Job Information" },
      { id: "23", name: "Payroll Management" },
      { id: "24", name: "CPF Calculator" },
      { id: "25", name: "Staff" },
      { id: "26", name: "Content" },
      { id: "27", name: "Section" },
      { id: "28", name: "Category" },
      { id: "29", name: "Sub Category" },
      { id: "30", name: "Valuelist" },
      { id: "31", name: "Setting" },
      { id: "32", name: "User Group" },
      { id: "33", name: "Support"}
    ],
    msg: "Success",
  });
});

// app.get("/getStaffNameDropdown", (req, res, next) => {
//   db.query(`SELECT a.staff_id,
//   CONCAT_WS(' ', a.first_name, a.last_name) AS staff_name 
//   FROM staff a WHERE a.staff_id !=''
//   AND (a.published = 1);`, (err, result) => {
//     if (err) {
//       return res.status(400).send({
//         data: err,
//         msg: "failed",
//       });
//     } else {
//       return res.status(200).send({
//         data: result,
//       });
//     }
//   });
// });

app.post("/editScore", (req, res, next) => {
  db.query(
    `UPDATE score_management
            SET score=${db.escape(req.body.score)}
            ,company_id=${db.escape(req.body.company_id)}
            ,review_status=${db.escape(req.body.review_status)}
            ,comments=${db.escape(req.body.comments)}
            ,reviewer=${db.escape(req.body.reviewer)}
          
            ,modification_date=${db.escape(
              req.body.modification_date
            )}

            WHERE score_management_id = ${db.escape(req.body.score_management_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});


app.post("/editScoreHistory", (req, res, next) => {
  db.query(
    `UPDATE score_management_history
            SET title=${db.escape(req.body.title)}
            ,question_id=${db.escape(req.body.question_id)}
            ,review_status=${db.escape(req.body.review_status)}
            ,comments=${db.escape(req.body.comments)}
            ,reviewer=${db.escape(req.body.reviewer)}
          
            ,modification_date=${db.escape(
              req.body.modification_date
            )}

            WHERE score_management_history_id = ${db.escape(req.body.score_management_history_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/addScoreHistory", (req, res, next) => {
  let data = {
    title: req.body.title,
    question_id: req.body.question_id,
    comments: req.body.comments,
    review_status: req.body.review_status,
    reviewer: req.body.reviewer,
    score_management_id: req.body.score_management_id,
    creation_date: req.body.creation_date,
  
  };
  let sql = "INSERT INTO score_management_history SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});
app.post("/insertScore", (req, res, next) => {
  let data = {
    company_id: req.body.company_id,
  
    creation_date: req.body.creation_date,
  
  };
  let sql = "INSERT INTO score_management SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});
app.get("/getCustomerName", (req, res, next) => {
  db.query(`SELECT company_name,company_id FROM company`, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
      });
    }
  });
});

app.get("/getQuestionName", (req, res, next) => {
  db.query(`SELECT question,question_management_id FROM question_management`, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
      });
    }
  });
});


app.post("/deleteScoremanagement", (req, res, next) => {
  let data = { score_management_id: req.body.score_management_id };
  let sql = "DELETE FROM score_management  WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/deleteScoreHistory", (req, res, next) => {
  let data = { score_management_history_id: req.body.score_management_history_id };
  let sql = "DELETE FROM score_management_history  WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.get("/getSupportDropdown", (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: "1", value_name: "Change Request" },
      { id: "2", value_name: "Issue" },
     
    ],
    msg: "Success",
  });
});

app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;