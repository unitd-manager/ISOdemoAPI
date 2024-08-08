const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/Database.js')
const userMiddleware = require('../middleware/UserModel.js')
var md5 = require('md5')
const fileUpload = require('express-fileupload')
const _ = require('lodash')
const mime = require('mime-types')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(cors())

app.use(
  fileUpload({
    createParentPath: true,
  }),
)

app.get('/getValueList', (req, res, next) => {
  db.query(
    `Select v.key_text
  ,v.valuelist_id
  ,v.value
  ,v.sort_order
  ,v.code
  ,v.creation_date
  ,v.modification_date
  From valuelist v 
  WHERE v.valuelist_id !=''
  ORDER BY v.sort_order ASC`,
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
        })
      }
    },
  )
})

app.get('/getValueListDropdown', (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: '1', name: 'Bank' },
      { id: '2', name: 'Client Type' },
      { id: '3', name: 'Company Category' },
      { id: '4', name: 'Company Group Name' },
      { id: '5', name: 'Company Industry' },
      { id: '6', name: 'Company Name' },
      { id: '7', name: 'Company Size' },
      { id: '8', name: 'Company Source' },
      { id: '9', name: 'Company Status' },
      { id: '10', name: 'Contact Title' },
      { id: '11', name: 'Staff Status' },
      { id: '12', name: 'Staff Team' },
      { id: '13', name: 'Staff Type' },
      { id: '14', name: 'Type of Leave' },
      { id: '15', name: 'Category Type'},
      { id: '16', name: 'Content Type'},
      { id: '17', name: 'Section Type'},
      { id: '18', name: 'Sub Category Type'},
      { id: '19', name: 'ISO Status'},
      { id: '20', name: 'Question Type'},
      { id: '21', name: 'Question Status'},
      { id: '21', name: 'GapAnalysis Description1'},
      { id: '21', name: 'GapAnalysis Description2'},
      { id: '21', name: 'GapAnalysis Description3'},
      { id: '21', name: 'GapAnalysis Description4'},
    
    ],
    msg: 'Success',
  })
})

app.post('/getValueListById', (req, res, next) => {
  db.query(
    `Select v.key_text
  ,v.valuelist_id
  ,v.value
  ,v.sort_order
  ,v.code
  ,v.creation_date
  ,v.modification_date
  From valuelist v 
  Where v.valuelist_id  = ${db.escape(req.body.valuelist_id)}`,
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
        })
      }
    },
  )
})

app.post('/editValueList', (req, res, next) => {
  db.query(
    `UPDATE valuelist 
  SET key_text=${db.escape(req.body.key_text)}
  ,value=${db.escape(req.body.value)}
  ,code=${db.escape(req.body.code)}
  ,modification_date=${db.escape(
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  )}
  WHERE valuelist_id = ${db.escape(req.body.valuelist_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: 'failed',
        })
      } else {
        return res.status(200).send({
          data: result,
          msg: 'Success',
        })
      }
    },
  )
})

app.post('/updateSortOrder', (req, res, next) => {
  db.query(
    `UPDATE valuelist 
            SET 
            sort_order=${db.escape(req.body.sort_order)}
            WHERE valuelist_id= ${db.escape(req.body.valuelist_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: 'failed',
        })
      } else {
        return res.status(200).send({
          data: result,
          msg: 'Success',
        })
      }
    },
  )
})

app.post('/insertValueList', (req, res, next) => {
  let data = {
    valuelist_id: req.body.valuelist_id,
    key_text: req.body.key_text,
    value: req.body.value,
    chi_value: req.body.chi_value,
    creation_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    modification_date: null,
    sort_order: req.body.sort_order,
    flag: req.body.flag,
    code: req.body.code,
  }
  let sql = 'INSERT INTO valuelist SET ?'
  let query = db.query(sql, data, (err, result) => {
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
      })
    }
  })
})

app.post('/deleteValueList', (req, res, next) => {
  let data = { valuelist_id: req.body.valuelist_id }
  let sql = 'DELETE FROM valuelist WHERE ?'
  let query = db.query(sql, data, (err, result) => {
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
      })
    }
  })
})

module.exports = app
