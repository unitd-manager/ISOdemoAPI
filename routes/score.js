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
  db.query(`Select s.*, a.company_name,t.correct_count
  From score_management s
          LEFT JOIN (company a) ON (a.company_id = s.company_id)
                LEFT JOIN (testing t) ON (t.score_management_id = s.score_management_id)
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

app.get('/getQuestions', (req, res, next) => {
  const invoiceItemId = req.query.iso_code_id;

  db.query(`Select s.*, a.question,a.option_1,a.option_2,a.option_3,a.option_4,a.correct_answer,a.question_type
  From iso_question s
          LEFT JOIN (question_management a) ON (a.question_id = s.question_id)

  Where s.iso_code_id= ?`,
  [invoiceItemId],(err, result) => {
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
  LEFT JOIN (question_management a) ON (a.question_id = c.question_id)
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

  app.post("/getCounts", (req, res, next) => {
    db.query(
      `Select 
      c.*
     
      FROM testing c
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
    ,t.correct_count
    FROM score_management c
        LEFT JOIN (company a) ON (a.company_id = c.company_id)
                LEFT JOIN (testing t) ON (t.score_management_id = c.score_management_id)
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
            ,modified_by=${db.escape(
              req.body.modified_by
            )}
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
            SET answer=${db.escape(req.body.answer)}
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


app.post("/updateAnswerCounts", (req, res, next) => {
  db.query(
    `UPDATE testing
            SET answered_count=${db.escape(req.body.answered_count)}
            ,unanswered_count=${db.escape(req.body.unanswered_count)}
            ,review_status=${db.escape(req.body.review_status)}
             ,iso_code_id=${db.escape(req.body.iso_code_id)}
             ,correct_count=${db.escape(req.body.correct_count)}
             ,total_question=${db.escape(req.body.total_question)}
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

app.post("/addScoreHistory", (req, res, next) => {
  const answers = req.body.answers; // Extract answers array from request body

  // Iterate over each answer and insert into the database
  answers.forEach(answer => {
    let data = {
      answer: answer.answer, // Store the answer in the title field
      question_id: answer.question_id,
      score_management_id: answer.score_management_id,
      creation_date: answer.creation_date,
      is_update: answer.is_update,
    };

    let sql = "INSERT INTO score_management_history SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      }
    });
  });

  return res.status(200).send({
    msg: "Success",
  });
});

app.post("/insertScore", (req, res, next) => {
  let data = {
    company_id: req.body.company_id,
    iso_code_id: req.body.iso_code_id,
    creation_date: req.body.creation_date,
    created_by: req.body.created_by
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
      // Get the inserted score_management_id
      let scoreManagementId = result.insertId;

      // Now insert into the testing table
      let testingData = {
        score_management_id: scoreManagementId,
        // Add other fields you need to insert into the testing table
      };

      let testingSql = "INSERT INTO testing SET ?";
      let testingQuery = db.query(testingSql, testingData, (testingErr, testingResult) => {
        if (testingErr) {
          console.log("error: ", testingErr);
          return res.status(400).send({
            data: testingErr,
            msg: "failed",
          });
        } else {
          return res.status(200).send({
            data: testingResult,
            msg: "Success",
          });
        }
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

app.get("/getIsoName", (req, res, next) => {
  db.query(`SELECT iso_code,iso_code_id FROM iso_code`, (err, result) => {
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
  db.query(`SELECT question,question_id FROM question_management`, (err, result) => {
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