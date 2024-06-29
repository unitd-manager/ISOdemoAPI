const express = require("express");
const db = require("../config/Database.js");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/getCategory", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,p.section_title
    ,c.seo_title
    FROM category c
    LEFT JOIN section p  ON (p.section_id = c.section_id)
    WHERE c.category_id!='' AND c.category_type='Question Category'
  ORDER By c.sort_order ASC`,
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

app.get("/getQuestion", (req, res, next) => {
  db.query(
    `SELECT 
   q.question_id,
   q.question_code,
   q.question,
   q.question_type,
   q.correct_answer,
   q.status,
   q.created_by,
   q.creation_date,
   q.modified_by,
   q.modification_date,
   q.option_3,
   q.option_4,
   q.published,
   c.category_title
  FROM question_management q
  LEFT JOIN category c ON c.category_id=q.category_id
  ORDER BY q.question_id DESC`,
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


app.post("/getQuestionById", (req, res, next) => {
  db.query(
    `SELECT 
q.question_id,
q.question_code,
q.question,
q.question_type,
q.correct_answer,
q.status,
q.created_by,
q.creation_date,
q.modified_by,
q.modification_date,
q.option_1,
q.option_2,
option_3,
q.option_4,
c.category_title,
q.category_id,
q.published
FROM question_management q
LEFT JOIN category c ON q.category_id=c.category_id
  WHERE q.question_id = ${db.escape(req.body.question_id)} `,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result[0],
          msg: "Success",
        });
      }
    }
  );
});



app.post("/editQuestionData", (req, res, next) => {
  db.query(
    `UPDATE question_management
            SET 
             question_code=${db.escape(req.body.question_code)}
            ,question=${db.escape(req.body.question)}
            ,question_type=${db.escape(req.body.question_type)}
            ,correct_answer=${db.escape(req.body.correct_answer)}
            ,option_1=${db.escape(req.body.option_1)}
            ,option_2=${db.escape(req.body.option_2)}
            ,option_3=${db.escape(req.body.option_3)}
            ,option_4=${db.escape(req.body.option_4)}
            ,status=${db.escape(req.body.status)}
            ,created_by=${db.escape(req.body.created_by)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,created_by=${db.escape(req.body.created_by)}
            ,iso_code_id=${db.escape(req.body.iso_code_id)}
            ,category_id=${db.escape(req.body.category_id)}
            ,published=${db.escape(req.body.published)}
            WHERE question_id  = ${db.escape(req.body.question_id )}`,
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


app.get("/getQuestionTypeFromValuelist", (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text="Question Type"`,
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

app.get("/getQuestionStatusFromValuelist", (req, res, next) => {
    db.query(
      `SELECT 
    value
    ,valuelist_id
    FROM valuelist WHERE key_text="Question Status"`,
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


app.post("/insertQuestion", (req, res, next) => {
  let data = {
    question_id : req.body.question_id ,
    question_code: req.body.question_code,
    question: req.body.question,
    question_type: req.body.question_type,
    correct_answer: req.body.correct_answer,
    status: req.body.status,
    created_by: req.body.created_by,
    creation_date: req.body.creation_date,
    modified_by: req.body.modified_by,
    modification_date: req.body.modification_date,
    iso_code_id: req.body.iso_code_id,
    category_id: req.body.category_id,

  };
  let sql = "INSERT INTO question_management SET ?";
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

app.post("/deleteContent", (req, res, next) => {
  let data = { content_id: req.body.content_id };
  let sql = "DELETE FROM content  WHERE ?";
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

app.get("/getSection", (req, res, next) => {
  db.query(
    `SELECT section_id,section_title
  FROM section`,
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

app.get('/getCategory', (req, res, next) => {
  db.query(`SELECT
  category_title,category_id
   From category 
   WHERE category_id != ''`,
    (err, result) => {
       
      if (err) {
        console.log('error: ', err);
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


app.post("/getCategoryTitle", (req, res, next) => {
  db.query(
    `SELECT 
    section_id
    ,section_title
    ,category_id
     FROM category 
     where section_id = ${db.escape(req.body.section_id)}`,
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
app.get("/getSubCategory", (req, res, next) => {
  db.query(
    `SELECT sub_category_id, sub_category_title
  FROM sub_category`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        })
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get('/getIsoCode', (req, res, next) => {
    db.query(`SELECT
    iso_code, iso_code_id 
     From iso_code
     WHERE iso_code_id != ''`,
      (err, result) => {
         
        if (err) {
          console.log('error: ', err);
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

  

module.exports = app;
