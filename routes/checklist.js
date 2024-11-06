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

app.get("/getISO", (req, res, next) => {
  db.query(
    `SELECT * from
  iso_code
  WHERE iso_code_id!=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post('/getChecklistById', (req, res, next) => {
  db.query(`SELECT cl.checklist_id,
      cl.title,
      cl.checklist_id,
      q.question AS question_title,
      COUNT(q.question_id) AS question_count,
      cl.created_by
     FROM checklist cl
     LEFT JOIN iso_question iq ON cl.checklist_id = iq.checklist_id
     LEFT JOIN question_management q ON iq.question_id = q.question_id
     WHERE cl.checklist_id = ${db.escape(req.body.checklist_id)}
     GROUP BY cl.checklist_id`,
    (err, result) => {
     
      if (err) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
});

app.get("/getCheckList", (req, res, next) => {
  db.query(
    `SELECT cl.checklist_id,
      cl.title,
      cl.checklist_id,
      COUNT(q.question_id) AS question_count
     FROM checklist cl
     LEFT JOIN iso_question iq ON cl.checklist_id = iq.checklist_id
     LEFT JOIN question_management q ON iq.question_id = q.question_id
     WHERE cl.checklist_id != ''
     GROUP BY cl.checklist_id`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});



app.post("/insertChecklist", (req, res, next) => {
  let data = {
    checklist_id: req.body.checklist_id,
    title: req.body.title,
    iso_code_id: req.body.iso_code_id,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
   };
  let sql = "INSERT INTO checklist SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Attendance has been created successfully",
      });
    }
  });
});

app.post("/editChecklist", (req, res, next) => {
  db.query(
    `UPDATE checklist
            SET title=${db.escape(req.body.title)}
               ,modification_date=${db.escape(
              new Date().toISOString().slice(0, 19).replace("T", " ")
            )}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE checklist_id = ${db.escape(req.body.checklist_id)}`,
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
                

module.exports = app;
