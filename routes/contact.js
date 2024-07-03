const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/Database.js');
const userMiddleware = require('../middleware/UserModel.js');
var md5 = require('md5');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const mime = require('mime-types')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(fileUpload({
    createParentPath: true
}));

app.get("/getCountry", (req, res, next) => {
  db.query(`SELECT * from geo_country`, (err, result) => {
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


app.get('/getCompany', (req, res, next) => {
  db.query(`SELECT company_id, 
    company_name, 
    company_code,
    email, 
    address_street, 
    address_town, 
    address_state, 
    address_country,
    phone, 
    fax, 
    notes, 
    creation_date, 
    modification_date,
    created_by, 
    modified_by, 
    website, 
    category
    FROM company
    WHERE company_id !=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(500).send({
          msg: 'Database error'
        });
       // result(err, null);
       // return;
      }
      if (result.length == 0) {
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





app.post('/insertCompany', (req, res, next) => {

  let data = {company_name: req.body.company_name,
  email: req.body.email, 
  company_code: req.body.company_code, 
  address_street: req.body.address_street, 
  address_flat: req.body.address_flat, 
  address_town: req.body.address_town, 
  address_state: req.body.address_state,
    address_country: req.body.address_country,
    address_po_code: req.body.address_po_code,
    phone: req.body.phone,
    fax: req.body.fax,
    creation_date: req.body.creation_date, 
 
   };
  let sql = "INSERT INTO company SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
          return res.status(200).send({
            data: result,
            msg:'New Company has been created successfully'
          });
    }
  });
});
app.post('/getCompanyByCompanyId', (req, res, next) => {
  db.query(`SELECT company_id, 
    company_name, 
    company_code,
    email, 
    address_street, 
    address_town, 
    address_state, 
    address_country,
    phone, 
    fax, 
    notes, 
    creation_date, 
    modification_date,
    created_by, 
    modified_by, 
    website, 
    category
    FROM company WHERE company_id =${db.escape(req.body.company_id)}`,
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
app.post('/editCompany', (req, res, next) => {
  db.query(`UPDATE company
            SET company_id=${db.escape(req.body.company_id)}
            ,company_name=${db.escape(req.body.company_name)}
            ,email=${db.escape(req.body.email)}
            ,fax=${db.escape(req.body.fax)}
            ,phone=${db.escape(req.body.phone)}
            ,address_street=${db.escape(req.body.address_street)}
            ,address_state=${db.escape(req.body.address_state)}
            ,address_country=${db.escape(req.body.address_country)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE company_id = ${db.escape(req.body.company_id)}`,
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
app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;