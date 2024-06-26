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


app.get("/getIsoCode", (req, res, next) => {
  db.query(
    `select 
    i.iso_code_id
    ,i.title 
    ,i.category_id
    ,i.version
    ,i.status
    ,i.description
    ,i.version
    ,i.iso_code
    ,c.category_title
    from iso_code i
    LEFT JOIN category c ON i.category_id = c.category_id
    where i.iso_code_id !='' `,
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


app.post('/insertQuestion', (req, res, next) => {
  const questionData = req.body.questionData;

  // Check if questionData is an array and has elements
  if (Array.isArray(questionData) && questionData.length > 0) {
    const values = questionData.map(q => [q.question_id, q.iso_code_id]);
    const query = 'INSERT INTO iso_question (question_id, iso_code_id) VALUES ?';

    db.query(query, [values], (err, result) => {
      if (err) {
        console.log('error: ', err);
        return res.status(400).send({
          data: err,
          msg: 'failed',
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: 'Success',
        });
      }
    });
  } else {
    return res.status(400).send({
      data: 'Invalid data',
      msg: 'failed',
    });
  }
});

app.get("/getISOValueList", (req, res, next) => {
  db.query(
    `SELECT 
       value,valuelist_id
       FROM valuelist WHERE key_text="ISO Status"`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err
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
app.post('/getIsoCodeById', (req, res, next) => {
  db.query(`select 
    i.iso_code_id
    ,i.title 
    ,i.category_id
    ,i.version
    ,i.status
    ,i.description
    ,i.version
    ,i.iso_code
    ,c.category_title
    ,i.creation_date
    ,i.modification_date
    ,i.created_by
    ,i.modified_by
    from iso_code i
    LEFT JOIN category c ON i.category_id = c.category_id
    where i.iso_code_id = ${db.escape(req.body.iso_code_id)}`,
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


app.get("/getQuestion", (req, res, next) => {
  const isoCodeId = req.query.iso_code_id || req.body.iso_code_id;
  const categoryId = req.query.category_id || req.body.category_id;

  const query = `
    SELECT 
      q.question_id,
      q.question_code,
      q.question,
      q.question_type,
      q.correct_answer
    FROM 
      question_management q
    LEFT JOIN 
      iso_question m
    ON 
      q.question_id = m.question_id AND m.iso_code_id = ?
    WHERE 
      m.question_id IS NULL
    AND 
      q.category_id = ?
  `;

  db.query(query, [isoCodeId, categoryId], (err, result) => {
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
    WHERE c.category_id!='' AND c.category_type='ISO Category'
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
app.post('/getIsoQuestionById', (req, res, next) => {
  db.query(`select 
    i.iso_code_id
    ,i.question_id
    ,q.question
    from iso_question i
    LEFT JOIN question_management q ON i.question_id = q.question_id
    where i.iso_code_id = ${db.escape(req.body.iso_code_id)}`,
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

app.post('/editISOCode', (req, res, next) => {
  db.query(`UPDATE iso_code
            SET title=${db.escape(req.body.title)}
            ,version=${db.escape(req.body.version)}
            ,description=${db.escape(req.body.description)}
            ,status=${db.escape(req.body.status)}
            ,category_id=${db.escape(req.body.category_id)}
            ,modification_date=${db.escape(req.body.modification_date)}
            WHERE iso_code_id = ${db.escape(req.body.iso_code_id)}`,
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
app.post("/getCodeValue", (req, res, next) => {
  var type = req.body.type;
  let sql = '';
  let key_text = '';
  let withprefix = true;
  if(type == 'opportunity'){
      key_text = 'nextOpportunityCode';
      sql = "SELECT * FROM setting WHERE key_text='opportunityCodePrefix' OR key_text='nextOpportunityCode'";
  }else if(type == 'receipt'){
      key_text = 'nextReceiptCode';
      sql = "SELECT * FROM setting WHERE key_text='receiptCodePrefix' OR key_text='nextReceiptCode'";
  }else if(type == 'projectreceipt'){
    key_text = 'nextProjectReceiptCode';
    sql = "SELECT * FROM setting WHERE key_text='projectreceiptCodePrefix' OR key_text='nextProjectReceiptCode'";
}else if(type == 'goodsdelivery'){
  key_text = 'nextGoodsDeliveryCode';
  sql = "SELECT * FROM setting WHERE key_text='goodsDeliveryCodePrefix' OR key_text='nextGoodsDeliveryCode'";  
}else if(type == 'projectreceipt'){
    key_text = 'nextProjectReceiptCode';
    sql = "SELECT * FROM setting WHERE key_text='projectReceiptCodePrefix' OR key_text='nextProjectReceiptCode'";
}else if(type == 'supplier'){
      key_text = 'nextSupplierCode';
      sql = "SELECT * FROM setting WHERE key_text='supplierCodePrefix' OR key_text='nextSupplierCode'";
  }else if(type == 'enquiry'){
      key_text = 'nextEnquiryCode';
      sql = "SELECT * FROM setting WHERE key_text='enquiryCodePrefix' OR key_text='nextEnquiryCode'";
  }else if(type == 'orders'){
      key_text = 'nextOrderCode';
      sql = "SELECT * FROM setting WHERE key_text='orderCodePrefix' OR key_text='nextOrderCode'";
  } else if(type == 'projectorders'){
    key_text = 'nextProjectOrderCode';
    sql = "SELECT * FROM setting WHERE key_text='projectorderCodePrefix' OR key_text='nextProjectOrderCode'";
} 
   else if(type == 'lead'){
      key_text = 'nextLeadsCode';
      sql = "SELECT * FROM setting WHERE key_text='leadsPrefix' OR key_text='nextLeadsCode'";  
  }else if(type == 'invoice'){
      key_text = 'nextInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='invoiceCodePrefix' OR key_text='nextInvoiceCode'";  
  }else if(type == 'subConworkOrder'){
      key_text = 'nextSubconCode';
    sql = "SELECT * FROM setting WHERE key_text='subconCodePrefix' OR key_text='nextSubconCode'";  
  }
  else if(type == 'project'){
      key_text = 'nextProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='projectCodePrefix' OR key_text='nextProjectCode'";  
  }
  else if(type == 'projectinvoice'){
    key_text = 'nextProjectInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='projectinvoiceCodePrefix' OR key_text='nextProjectInvoiceCode'";  
}
  else if(type == 'quote'){
      key_text = 'nextQuoteCode';
      sql = "SELECT * FROM setting WHERE key_text='quoteCodePrefix' OR key_text='nextQuoteCode'";  
  }
  else if(type == 'creditNote'){
      key_text = 'nextCreditNoteCode';
      sql = "SELECT * FROM setting WHERE key_text='creditNotePrefix' OR key_text='nextCreditNoteCode'";  
  }else if(type == 'employee'){
    //   withprefix = false;
      key_text = 'nextEmployeeCode';
    sql = "SELECT * FROM setting WHERE key_text='employeeCodePrefix' OR key_text='nextEmployeeCode'";  
  }
  else if(type == 'claim'){
      withprefix = false;
      key_text = 'nextClaimCode';
      sql = "SELECT * FROM setting WHERE  key_text='nextClaimCode'";  
  }
  else if(type == 'QuoteCodeOpp'){
      withprefix = false;
      key_text = 'nextQuoteCodeOpp';
      sql = "SELECT * FROM setting WHERE  key_text='nextQuoteCodeOpp'";  
  }
  else if(type == 'purchaseOrder'){
     
      key_text = 'nextPurchaseOrderCode';
         sql = "SELECT * FROM setting WHERE key_text='purchaseOrderCodePrefix' OR key_text='nextPurchaseOrderCode'";  

  }

  else if(type == 'isocode'){
      key_text = 'nextISOCode';
      sql = "SELECT * FROM setting WHERE key_text='ISOcodeprofix' OR key_text='nextISOCode'";
  }
  else if(type == 'PurchaseReturn'){
     
    key_text = 'nextPurchaseReturnCode';
       sql = "SELECT * FROM setting WHERE key_text='PurchaseReturnCodePrefix' OR key_text='nextPurchaseReturnCode'";  

}
  let query = db.query(sql, (err, result) => {
      let old = result
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
       
        var finalText = '';
        var newvalue = 0
        if(withprefix == true){
            var codeObject = result.filter(obj => obj.key_text === key_text);
            
             var prefixObject = result.filter(obj => obj.key_text != key_text);
            finalText = prefixObject[0]?.value + codeObject[0]?.value;
            newvalue = parseInt(codeObject[0]?.value) + 1
        }else{
            finalText = result[0]?.value
            newvalue = parseInt(result[0]?.value) + 1
        }
        newvalue = newvalue.toString()
         let query = db.query(`UPDATE setting SET value=${db.escape(newvalue)} WHERE key_text = ${db.escape(key_text)}`, (err, result) => {
            if (err) {
              return res.status(400).send({
                data: err,
                msg: "failed",
              });
            } else {
              return res.status(200).send({
                data: finalText,
                result:old
              });
            }
        });
    }
  });
});
app.post('/deleteISOquestion', (req, res, next) => {

  let data = {question_id: req.body.question_id};
  let sql = "DELETE FROM iso_question WHERE ?";
  let query = db.query(sql, data,(err, result) => {
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
  });
});
app.post('/insertISOcode', (req, res, next) => {

  let data = {iso_code_id	:req.body.iso_code_id	
   , title	: req.body.title	
   , status: req.body.status
   , version: req.body.version	
   , creation_date: req.body.creation_date
   , modification_date: req.body.modification_date
   , description: req.body.description
   , iso_code: req.body.iso_code
  };
  let sql = "INSERT INTO iso_code SET ?";
  let query = db.query(sql, data,(err, result) => {
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
  });
});







app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;