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

app.post("/getOrdersByContactId", (req, res, next) => {
  db.query(
    `select o.order_id 
    ,o.order_status
    ,o.payment_method
    ,o.shipping_first_name
    ,o.shipping_last_name
    ,o.shipping_email
    ,o.shipping_address1
    ,o.shipping_address2
    ,o.shipping_address_city
    ,o.shipping_address_area
    ,o.shipping_address_state
    ,o.shipping_address_country_code
    ,o.shipping_address_po_code
    ,o.shipping_phone
    ,o.cust_first_name
    ,o.cust_last_name
    ,o.cust_email
    ,o.cust_address1
    ,o.cust_address2
    ,o.cust_address_city
    ,o.cust_address_area
    ,o.cust_address_state
    ,o.cust_address_country
    ,o.cust_address_po_code
    ,o.cust_phone
    ,o.memo
    ,o.creation_date
    ,o.modification_date
    ,o.flag
    ,o.record_type
    ,o.module
    ,o.currency
    ,o.contact_id 
    ,o.order_date
   ,o.order_code
   ,o.shipping_charge
   ,o.company_id 
   ,o.add_gst_to_total
   ,o.invoice_terms
   ,o.notes
   ,o.shipping_address_country
   ,o.address_country
   ,o.delivery_to_text
   ,o.created_by
   ,o.modified_by
   ,o.discount
   ,o.name_of_company
   ,o.vat
   ,o.cust_company_name
   ,o.site_id
   ,o.manual_invoice
   ,o.link_stock
   ,o.selling_company
   ,o.link_account
   ,o.start_date
   ,o.end_date
   ,o.auto_create_invoice
   ,o.delivery_date
   ,o.delivery_terms
   ,o.cust_fax
   ,o.shipping_fax
    from orders o
    LEFT JOIN contact c ON (c.contact_id = o.contact_id)
    where c.contact_id= ${db.escape(req.body.contact_id)}`,
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


app.post("/editOrders", (req, res, next) => {
  db.query(
    `UPDATE orders
            SET order_id=${db.escape(req.body.order_id)}
            ,order_status=${db.escape(req.body.order_status)}
            ,payment_method=${db.escape(req.body.payment_method)}
            ,shipping_first_name=${db.escape(req.body.shipping_first_name)}
            ,shipping_last_name=${db.escape(req.body.shipping_last_name)}
            ,shipping_email=${db.escape(req.body.shipping_email)}
            ,shipping_address1=${db.escape(req.body.shipping_address1)}
            ,shipping_address2=${db.escape(req.body.shipping_address2)}
            ,shipping_address_city=${db.escape(req.body.shipping_address_city)}
            ,shipping_address_area=${db.escape(req.body.shipping_address_area)}
            ,shipping_address_state=${db.escape(req.body.shipping_address_state)}
            ,shipping_address_country_code=${db.escape(req.body.shipping_address_country_code)}
            ,shipping_address_po_code=${db.escape(req.body.shipping_address_po_code)}
            ,shipping_phone=${db.escape(req.body.shipping_phone)}
            ,cust_first_name=${db.escape(req.body.cust_first_name)}
            ,cust_last_name=${db.escape(req.body.cust_last_name)}
            ,cust_email=${db.escape(req.body.cust_email)}
            ,cust_address1=${db.escape(req.body.cust_address1)}
            ,cust_address2=${db.escape(req.body.cust_address2)}
            ,cust_address_city=${db.escape(req.body.cust_address_city)}
            ,cust_address_area=${db.escape(req.body.cust_address_area)}
            ,cust_address_state=${db.escape(req.body.cust_address_state)}
            ,cust_address_country=${db.escape(req.body.cust_address_country)}
            ,cust_address_po_code=${db.escape(req.body.cust_address_po_code)}
            ,cust_phone=${db.escape(req.body.cust_phone)}
            ,memo=${db.escape(req.body.memo)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,flag=${db.escape(req.body.flag)}
            ,record_type=${db.escape(req.body.record_type)}
            ,module=${db.escape(req.body.module)}
            ,currency=${db.escape(req.body.currency)}
            ,contact_id=${db.escape(req.body.contact_id)}
            ,order_date=${db.escape(req.body.order_date)}
            ,order_code=${db.escape(req.body.order_code)}
            ,shipping_charge=${db.escape(req.body.shipping_charge)}
            ,company_id=${db.escape(req.body.company_id)}
            ,add_gst_to_total=${db.escape(req.body.add_gst_to_total)}
            ,invoice_terms=${db.escape(req.body.invoice_terms)}
            ,notes=${db.escape(req.body.notes)}
            ,shipping_address_country=${db.escape(req.body.shipping_address_country)}
            ,address_country=${db.escape(req.body.address_country)}
            ,delivery_to_text=${db.escape(req.body.delivery_to_text)}
            ,created_by=${db.escape(req.body.created_by)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,discount=${db.escape(req.body.discount)}
            ,name_of_company=${db.escape(req.body.name_of_company)}
            ,vat=${db.escape(req.body.vat)}
            ,cust_company_name=${db.escape(req.body.cust_company_name)}
            ,site_id=${db.escape(req.body.site_id)}
            ,manual_invoice=${db.escape(req.body.manual_invoice)}
            ,link_stock=${db.escape(req.body.link_stock)}
            ,selling_company=${db.escape(req.body.selling_company)}
            ,link_account=${db.escape(req.body.link_account)}
            ,start_date=${db.escape(req.body.start_date)}
            ,end_date=${db.escape(req.body.end_date)}
            ,auto_create_invoice=${db.escape(req.body.auto_create_invoice)}
            ,delivery_date=${db.escape(req.body.delivery_date)}
            ,delivery_terms=${db.escape(req.body.delivery_terms)}
            ,cust_fax=${db.escape(req.body.cust_fax)}
            ,shipping_fax=${db.escape(req.body.shipping_fax)}
            ,selling_company=${db.escape(req.body.selling_company)}
            WHERE order_id =  ${db.escape(req.body.order_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: "Failed",
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

app.post('/insertorders', (req, res, next) => {
  let data = {
    order_id: req.body.order_id,
    order_status: req.body.order_status,
    payment_method: req.body.payment_method,
    shipping_first_name: req.body.shipping_first_name,
    shipping_last_name: req.body.shipping_last_name,
    shipping_email: req.body.shipping_email,
    shipping_address1: req.body.shipping_address1,
    shipping_address2: req.body.shipping_address2,
    shipping_address_city: req.body.shipping_address_city,
    shipping_address_area: req.body.shipping_address_area,
    shipping_address_state: req.body.shipping_address_state,
    shipping_address_country_code: req.body.shipping_address_country_code,
    shipping_address_po_code: req.body.shipping_address_po_code,
    shipping_phone: req.body.shipping_phone,
    cust_first_name: req.body.cust_first_name,
    cust_last_name: req.body.cust_last_name,
    cust_email: req.body.cust_email,
    cust_address1: req.body.cust_address1,
    cust_address2: req.body.cust_address2,
    cust_address_city: req.body.cust_address_city,
    cust_address_area: req.body.cust_address_area,
    cust_address_state: req.body.cust_address_state,
    cust_address_country: req.body.cust_address_country,
    cust_address_po_code: req.body.cust_address_po_code,
    cust_phone: req.body.cust_phone,
    memo: req.body.memo,
    creation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    modification_date: req.body.modification_date,
    flag: req.body.flag,
    record_type: req.body.record_type,
    module: req.body.module,
    currency: req.body.currency,
    contact_id: req.body.contact_id,
    order_date: req.body.order_date,
    order_code: req.body.order_code,
    shipping_charge: req.body.shipping_charge,
    company_id: req.body.company_id,
    add_gst_to_total: req.body.add_gst_to_total,
    invoice_terms: req.body.invoice_terms,
    notes: req.body.notes,
    shipping_address_country: req.body.shipping_address_country,
    address_country: req.body.address_country,
    delivery_to_text: req.body.delivery_to_text,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    discount: req.body.discount,
    name_of_company: req.body.name_of_company,
    vat: req.body.vat,
    cust_company_name: req.body.cust_company_name,
    site_id: req.body.site_id,
    manual_invoice: req.body.manual_invoice,
    link_stock: req.body.link_stock,
    selling_company: req.body.selling_company,
    link_account: req.body.link_account,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    auto_create_invoice: req.body.auto_create_invoice,
    delivery_date: req.body.delivery_date,
    delivery_terms: req.body.delivery_terms,
    cust_fax: req.body.cust_fax,
    shipping_fax: req.body.shipping_fax,
  };

  let sql = "INSERT INTO orders SET ?";
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

app.post("/deleteorders", (req, res, next) => {
  let data = { order_id: req.body.order_id };
  let sql = "DELETE FROM orders WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "Failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/editorderItem", (req, res, next) => {
  db.query(
    `UPDATE order_item
            SET order_id=${db.escape(req.body.order_id)}
            ,contact_id=${db.escape(req.body.contact_id)}
            ,qty=${db.escape(req.body.qty)}
            ,unit_price=${db.escape(req.body.unit_price)}
            ,item_title=${db.escape(req.body.item_title)}
            ,model=${db.escape(req.body.model)}
            ,module=${db.escape(req.body.module)}
            ,cost_price=${db.escape(req.body.cost_price)}
            ,discount_percentage=${db.escape(req.body.discount_percentage)}
            ,mark_up=${db.escape(req.body.mark_up)}
            ,item_code=${db.escape(req.body.item_code)}
            ,price_from_supplier=${db.escape(req.body.price_from_supplier)}
            ,ref_code=${db.escape(req.body.ref_code)}
            ,description=${db.escape(req.body.description)}
            ,site_id=${db.escape(req.body.site_id)}
            ,unit=${db.escape(req.body.unit)}
            ,description=${db.escape(req.body.description)}
            ,remarks=${db.escape(req.body.remarks)}
            ,month=${db.escape(req.body.month)}
            ,year=${db.escape(req.body.year)}
            WHERE order_item_id  =  ${db.escape(req.body.order_item_id )}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: "Failed",
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

app.post('/insertOrderItem', (req, res, next) => {
  let data = {
    order_item_id : req.body.order_item_id ,
    order_id: req.body.order_id,
    contact_id: req.body.contact_id,
    qty: req.body.qty,
    unit_price: req.body.unit_price,
    item_title: req.body.item_title,
    model: req.body.model,
    module: req.body.module,
    cost_price: req.body.cost_price,
    discount_percentage: req.body.discount_percentage,
    mark_up: req.body.mark_up,
    qty_for_invoice: req.body.qty_for_invoice,
    mark_up_type: req.body.mark_up_type,
    item_code: req.body.item_code,
    price_from_supplier: req.body.price_from_supplier,
    ref_code: req.body.ref_code,
    discount_type: req.body.discount_type,
    site_id: req.body.site_id,
    unit: req.body.unit,
    description: req.body.description,
    remarks: req.body.remarks,
    month: req.body.month,
    year: req.body.year,
    
  };
  let sql = "INSERT INTO order_item SET ?";
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

app.post("/deleteorderitem", (req, res, next) => {
  let data = { order_item_id: req.body.order_item_id };
  let sql = "DELETE FROM order_item WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "Failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/getOrderHistoryByContactId", (req, res, next) => {
  db.query(
    `select o.order_item_id 
    ,o.order_id
    ,o.contact_id
    ,o.qty
    ,o.unit_price
    ,o.item_title
    ,o.model
    ,o.module
    ,o.cost_price
    ,o.discount_percentage
    ,o.mark_up
    ,o.qty_for_invoice
    ,o.mark_up_type
    ,o.item_code
    ,o.price_from_supplier
    ,o.ref_code
    ,o.discount_type
    ,o.site_id
    ,o.unit
    ,o.description
    ,o.remarks
    ,o.month
    ,o.year
    from order_item o
    LEFT JOIN contact c ON (c.contact_id = o.contact_id)
  where c.contact_id= ${db.escape(req.body.contact_id)}`,
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




app.post("/editInvoiceItem", (req, res, next) => {
  db.query(
    `UPDATE invoice_item 
            SET qty=${db.escape(req.body.qty)}
            ,unit_price=${db.escape(req.body.unit_price)}
            ,item_title=${db.escape(req.body.item_title)}
            ,model=${db.escape(req.body.model)}
            ,module=${db.escape(req.body.module)}
            ,cost_price=${db.escape(req.body.cost_price)}
            ,item_code=${db.escape(req.body.item_code)}
            ,vat=${db.escape(req.body.vat)}
            ,discount_percentage=${db.escape(req.body.discount_percentage)}
            ,discount_type=${db.escape(req.body.discount_type)}
            ,site_id=${db.escape(req.body.site_id)}
            ,item_code_backup=${db.escape(req.body.item_code_backup)}
            ,unit=${db.escape(req.body.unit)}
            ,description=${db.escape(req.body.description)}
            ,remarks=${db.escape(req.body.remarks)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,month=${db.escape(req.body.month)}
            ,year=${db.escape(req.body.year)}
            ,total_cost=${db.escape(req.body.total_cost)}
            ,amount=${db.escape(req.body.amount)}
            ,s_no=${db.escape(req.body.s_no)}
            WHERE invoice_id  =  ${db.escape(req.body.invoice_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: "Failed",
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

app.get("/getMaxInvoiceCode", (req, res, next) => {
  db.query(
    `SELECT MAX(invoice_code) as inv_code FROM invoice`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: "Failed",
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

app.get("/getMaxReceiptCode", (req, res, next) => {
  db.query(
    `SELECT MAX(receipt_code) as rec_code FROM receipt`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: "Failed",
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
app.post("/insertInvoice", (req, res, next) => {
  let data = {
    invoice_code: req.body.invoice_code,
    order_id: req.body.order_id,
    invoice_amount: req.body.invoice_amount,
    invoice_date: req.body.invoice_date,
    mode_of_payment: req.body.mode_of_payment,
    status: req.body.status,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    flag: req.body.flag,
    created_by: req.body.created_by,
    invoice_type: req.body.invoice_type,
    invoice_due_date: req.body.invoice_due_date,
    invoice_terms: req.body.invoice_terms,
    notes: req.body.notes,
    cst: req.body.cst,
    vat: req.body.vat,
    cst_value: req.body.cst_value,
    vat_value: req.body.vat_value,
    frieght: req.body.frieght,
    p_f: req.body.p_f,
    so_ref_no: req.body.so_ref_no,
    discount: req.body.discount,
    invoice_code_vat: req.body.invoice_code_vat,
    invoice_used: req.body.invoice_used,
    invoice_code_vat_quote: req.body.invoice_code_vat_quote,
    site_id: req.body.site_id,
    manual_invoice_seq: req.body.manual_invoice_seq,
    apply_general_vat: req.body.apply_general_vat,
    selling_company: req.body.selling_company,
    project_id: req.body.project_id,
    invoice_paid_date: req.body.invoice_paid_date,
    modified_by: req.body.modified_by,
    invoice_sent_out: req.body.invoice_sent_out,
    gst_percentage: req.body.gst_percentage,
    title: req.body.title,
    rate_text: req.body.rate_text,
    qty_text: req.body.qty_text,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    reference_no: req.body.reference_no,
    CBF_Ref_No: req.body.CBF_Ref_No,
    invoice_code_user: req.body.invoice_code_user,
    invoice_sent_out_date: req.body.invoice_sent_out_date,
    payment_terms: req.body.payment_terms,
    po_number: req.body.po_number,
    project_location: req.body.project_location,
    project_reference: req.body.project_reference,
    quote_code: req.body.quote_code,
    invoice_manual_code: req.body.invoice_manual_code,
    code: req.body.code,
    site_code: req.body.site_code,
    attention: req.body.attention,
    reference: req.body.reference,
    gst_value: req.body.gst_value,
  };
  let sql = "INSERT INTO invoice SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "Failed",
      });
    } else {
      return res.status(200).send({
        data: result[0],
        msg: "Success",
      });
    }
  });
});
app.delete("/deleteInvoice", (req, res, next) => {
  let data = { invoice_id: req.body.invoice_id };
  let sql = "DELETE FROM invoice WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "Failed",
      });
    } else {
      return res.status(200).send({
        data: result[0],
        msg: "Success",
      });
    }
  });
});

app.post("/insertInvoiceItem", (req, res, next) => {
  let data = {
    qty: req.body.qty,
    invoice_id: req.body.invoice_id,
    unit_price: req.body.unit_price,
    item_title: req.body.item_title,
    model: req.body.model,
    module: req.body.module,
    cost_price: req.body.cost_price,
    item_code: req.body.item_code,
    vat: req.body.vat,
    discount_percentage: req.body.discount_percentage,
    discount_type: req.body.discount_type,
    amount: req.body.amount,
    s_no: req.body.s_no,
    site_id: req.body.site_id,
    item_code_backup: req.body.item_code_backup,
    unit: req.body.unit,
    description: req.body.description,
    remarks: req.body.remarks,
    modification_date: req.body.modification_date,
    modified_by: req.body.modified_by,
    month: req.body.month,
    year: req.body.year,
    total_cost: req.body.total_cost,
  };
  let sql = "INSERT INTO invoice_item SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "Failed",
      });
    } else {
      return res.status(200).send({
        data: result[0],
        msg: "Success",
      });
    }
  });
});

app.post("/insertorder_item", (req, res, next) => {
  let data = {
    qty: req.body.qty,
    unit_price: req.body.unit_price,
    item_title: req.body.item_title,
    model: req.body.model,
    module: req.body.module,
    cost_price: req.body.cost_price,
    discount_percentage: req.body.discount_percentage,
    mark_up: req.body.mark_up,
    qty_for_invoice: req.body.qty_for_invoice,
    mark_up_type: req.body.mark_up_type,
    item_code: req.body.item_code,
    price_from_supplier: req.body.price_from_supplier,
    ref_code: req.body.ref_code,
    discount_type: req.body.discount_type,
    vat: req.body.vat,
    site_id: req.body.site_id,
    item_code_backup: req.body.item_code_backup,
    unit: req.body.unit,
    description: req.body.description,
    remarks: req.body.remarks,
    month: req.body.month,
    year: req.body.year,
    ot_hourly_rate: req.body.ot_hourly_rate,
    ph_hourly_rate: req.body.ph_hourly_rate,
    employee_ot_hours: req.body.employee_ot_hours,
    employee_ph_hours: req.body.employee_ph_hours,
    part_no: req.body.part_no,
    admin_charges: req.body.admin_charges,
    transport_charges: req.body.transport_charges,
    quote_id: req.body.quote_id,
    drawing_number: req.body.drawing_number,
    drawing_title: req.body.drawing_title,
    drawing_revision: req.body.drawing_revision,
  };

  let sql = "INSERT INTO order_item SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.delete("/deleteorder_item", (req, res, next) => {
  let data = { order_item_id: req.body.order_item_id };
  let sql = "DELETE FROM order_item  WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/insertreceipt", (req, res, next) => {
  let data = {
    receipt_code: req.body.receipt_code,
    amount: req.body.amount,
    mode_of_payment: req.body.mode_of_payment,
    remarks: req.body.remarks,
    receipt_date: req.body.receipt_date,
    published: req.body.published,
    flag: req.body.flag,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    order_id: req.body.order_id,
    receipt_status: req.body.receipt_status,
    cheque_date: req.body.cheque_date,
    bank_name: req.body.bank_name,
    site_id: req.body.site_id,
    cheque_no: req.body.cheque_no,
  };

  let sql = "INSERT INTO receipt SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.delete("/deleteReceipt", (req, res, next) => {
  let data = { receipt_id: req.body.receipt_id };
  let sql = "DELETE FROM receipt WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/insertInvoiceReceiptHistory", (req, res, next) => {
  let data = {
    invoice_id: req.body.invoice_id,
    receipt_id: req.body.receipt_id,
    published: req.body.published,
    flag: req.body.flag,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    amount: req.body.amount,
    site_id: req.body.site_id,
  };

  let sql = "INSERT INTO invoice_receipt_history  SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.delete("/deleteInvoice_receipt_history", (req, res, next) => {
  let data = {
    invoice_receipt_history_id: req.body.invoice_receipt_history_id,
  };
  let sql = "DELETE FROM invoice_receipt_history WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/insertcredit_note", (req, res, next) => {
  let data = {
    credit_note_code: req.body.credit_note_code,
    amount: req.body.amount,
    gst_amount: req.body.gst_amount,
    remarks: req.body.remarks,
    from_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    flag: req.body.flag,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    order_id: req.body.order_id,
    credit_note_status: req.body.credit_note_status,
    site_id: req.body.site_id,
    gst_percentage: req.body.gst_percentage,
  };

  let sql = "INSERT INTO credit_note SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post("/insertcredit_note_history", (req, res, next) => {
  let data = {
    invoice_id: req.body.invoice_id,
    credit_note_id: req.body.credit_note_id,
    published: req.body.published,
    amount: req.body.amount,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    site_id: req.body.site_id,
    item_title: req.body.item_title,
    description: req.body.description,
    gst_percentage: req.body.gst_percentage,
  };

  let sql = "INSERT INTO invoice_credit_note_history SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.delete("/deletecredit_note", (req, res, next) => {
  let data = { credit_note_id: req.body.credit_note_id };
  let sql = "DELETE FROM credit_note WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;
