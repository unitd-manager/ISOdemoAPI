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



app.get("/getContent", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=c.sub_category_id 
  WHERE c.content_id !='' ORDER BY c.sort_order ASC`,
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

app.get('/getAboutUs', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 23
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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



app.get("/getContent", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=c.sub_category_id 
  WHERE c.content_id !='' ORDER BY c.sort_order ASC`,
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

app.get('/getAboutUs', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 23
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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




app.get('/getShipping', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
            FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
        WHERE c.published = 1
 AND c.content_type = 'Shipping' 
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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

app.post('/insertApplication', (req, res, next) => {

  let data = {application_id: req.body.application_id
    , company_name : req.body. company_name 
    , company_rep_name: req.body.company_rep_name
    , legal_obligation: req.body.legal_obligation
    , company_address: req.body.company_address
    , address1: req.body.address1
    , address2: req.body.address2
    , address3: req.body.address3
    , scope1: req.body.scope1
    , scope2:  req.body.scope2
    , scope3:  req.body.scope3
    , standard: req.body.standard
    , website: req.body.website
    , email: req.body.email
    , phone: req.body.phone
    , area_of_org: req.body.area_of_org
    , scope_of_reg: req.body.scope_of_reg
    , client_operation : req.body. client_operation 
    , operation_location: req.body.operation_location
    , process: req.body.process
    , outsource_process: req.body.outsource_process
    , organization_type: req.body.organization_type
    , wfh1: req.body.wfh1
    , wfh2: req.body.wfh2
    , sub_con1: req.body.sub_con1
    , sub_con2: req.body.sub_con2
    , part_time_emp1: req.body.part_time_emp1
    , part_time_emp2: req.body.part_time_emp2
    , tem_site_emp1: req.body.tem_site_emp1
    , tem_site_emp2: req.body.tem_site_emp2
    , non_permanent_employee1: req.body.non_permanent_employee1
    , non_permanent_employee2: req.body.non_permanent_employee2
    , total_emp1: req.body.total_emp1
    , total_emp2: req.body.total_emp2
    , total_emp3: req.body.total_emp3
    , total_emp4: req.body.total_emp4
    , total_emp5: req.body.total_emp5
    , total_emp6: req.body.total_emp6
    , permanent_employee1: req.body.permanent_employee1
    , permanent_employee2 : req.body. permanent_employee2 
    , employee_shift_breakdown: req.body.employee_shift_breakdown
    , typical_site_count: req.body.typical_site_count
    , ea_code: req.body.ea_code
    , doc_language: req.body.doc_language
    , stage1_assessment: req.body.stage1_assessment
    , stage2_assessment: req.body.stage2_assessment
    , external_consultant_experience: req.body.external_consultant_experience
    , how_heard_about_hec: req.body.how_heard_about_hec
    , doc_set_development: req.body.doc_set_development
    , management_review_scope: req.body.management_review_scope
    , integrated_internal_audits: req.body.integrated_internal_audits
    , integrated_policy_objectives : req.body. integrated_policy_objectives 
    , integrated_systems_processes: req.body.integrated_systems_processes
    , integrated_improvement_mechanisms: req.body.integrated_improvement_mechanisms
    , management_support_responsibilities: req.body.management_support_responsibilities
    , preferred_audit_language: req.body.preferred_audit_language
    , significant_environmental_aspects: req.body.significant_environmental_aspects
    , environmental_legal_requirements: req.body.environmental_legal_requirements
    , significant_hazards: req.body.significant_hazards
    , hazardous_materials: req.body.hazardous_materials
    , ohs_legal_requirements: req.body.ohs_legal_requirements
    , recognized_unions: req.body.recognized_unions
    , major_accidents_current_year : req.body. major_accidents_current_year 
    , absences_days_current_year: req.body.absences_days_current_year
    , occurrence_current_year: req.body.occurrence_current_year
    , hospital_treatment_current_year: req.body.hospital_treatment_current_year
    , major_accidents_prev_year: req.body.major_accidents_prev_year
    , absences_days_prev_year: req.body.absences_days_prev_year
    , occurrence_prev_year: req.body.occurrence_prev_year
    , hospital_treatment_prev_year: req.body.hospital_treatment_prev_year
    , major_accidents_year_ago: req.body.major_accidents_year_ago
    , absences_days_year_ago: req.body.absences_days_year_ago
    , occurrence_year_ago: req.body.occurrence_year_ago
    , hospital_treatment_year_ago : req.body. hospital_treatment_year_ago 
    , excluded_controls_iso27001: req.body.excluded_controls_iso27001
    , no_of_sys_users: req.body.no_of_sys_users
    , no_of_servers: req.body.no_of_servers
    , no_of_work_station: req.body.no_of_work_station
    , no_of_maintenance_staff: req.body.no_of_maintenance_staff
    , date_of_application: req.body.date_of_application
    , sign_represent: req.body.Sign_represent
    , network_encryption_tech : req.body. network_encryption_tech 
    , inform_security_legal_req: req.body.inform_security_legal_req
    , applicable_legislation: req.body.applicable_legislation
    , no_shift_employee: req.body.no_shift_employee
    
  };
  let sql = "INSERT INTO application SET ?";
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


app.get("/getApplication", (req, res, next) => {
  db.query(
    `SELECT c.application_id
    ,c.company_name
    ,c.company_rep_name
    ,c.standard
    ,c.organization_type
    ,c.date_of_application
    FROM application c
   WHERE c.application_id !=''
  ORDER By c.application_id ASC`,
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
app.get('/getAboutUsCompany', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 25
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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




app.get("/getFaqPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="FAQ Page"`,
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

app.get("/getStoreLocatorPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="StoreLocator"`,
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

app.get("/getSupportPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Support Policy"`,
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

app.get("/getReturnsPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Returns Policy"`,
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

app.get("/getReturnsDescriptionPage", (req, res, next) => {
  db.query(
    `SELECT 
       description,content_id
       FROM content WHERE content_type="Returns Policy Description"`,
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





app.post("/getContentById", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published 
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=sc.sub_category_id 
  WHERE c.content_id = ${db.escape(req.body.content_id)} `,
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

app.get("/getSortOrderbyId", (req, res, next) => {
  db.query(
    `Select sort_order
   FROM content 
   WHERE content_id !=''`,
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

app.post("/editSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content
            SET sort_order=${db.escape(req.body.sort_order)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/editContent", (req, res, next) => {
  db.query(
    `UPDATE content
            SET title=${db.escape(req.body.title)}
            ,section_id=${db.escape(req.body.section_id)}
            ,content_type=${db.escape(req.body.content_type)}
            ,category_id=${db.escape(req.body.category_id)}
            ,sub_category_id=${db.escape(req.body.sub_category_id)}
            ,show_title=${db.escape(req.body.show_title)}
            ,published=${db.escape(req.body.published)}
            ,content_date=${db.escape(req.body.content_date)}
            ,description=${db.escape(req.body.description)}
            ,modification_date=${db.escape(
              new Date().toISOString().slice(0, 19).replace("T", " ")
            )}
            ,content_type=${db.escape(req.body.content_type)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/updateSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content SET sort_order=${db.escape(
      req.body.sort_order
    )} WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.get("/getValueFromValueList", (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text="Content Type"`,
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
app.post("/insertContent", (req, res, next) => {
  let data = {
    section_id: req.body.section_id,
    category_id: req.body.category_id,
    sub_category_id: req.body.sub_category_id,
    author_id: req.body.author_id,
    title: req.body.title,
    show_title: 1,
    type: req.body.type,
    description_short: req.body.description_short,
    description: req.body.description,
    sort_order: 0,
    published: 1,
    member_only: req.body.member_only,
    latest: req.body.latest,
    favourite: req.body.favourite,
    creation_date: new Date().toISOString(),
    modification_date: req.body.modification_date,
    content_date: req.body.content_date,
    chi_title: req.body.chi_title,
    chi_description: req.body.chi_description,
    content_type: req.body.content_type,
    external_link: req.body.external_link,
    meta_title: req.body.meta_title,
    meta_keyword: req.body.meta_keyword,
    meta_description: req.body.meta_description,
    flag: req.body.flag,
   internal_link: req.body.internal_link,
  };
  let sql = "INSERT INTO content SET ?";
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
module.exports = app;

app.get('/getShipping', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
            FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
        WHERE c.published = 1
 AND c.content_type = 'Shipping' 
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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

app.get('/getAboutUsCompany', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 25
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
    (err, result) => {
       
      if (result.length === 0) {
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




app.get("/getFaqPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="FAQ Page"`,
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

app.get("/getStoreLocatorPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="StoreLocator"`,
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

app.get("/getSupportPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Support Policy"`,
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

app.get("/getReturnsPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Returns Policy"`,
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

app.get("/getReturnsDescriptionPage", (req, res, next) => {
  db.query(
    `SELECT 
       description,content_id
       FROM content WHERE content_type="Returns Policy Description"`,
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





app.post("/getContentById", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published 
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=sc.sub_category_id 
  WHERE c.content_id = ${db.escape(req.body.content_id)} `,
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

app.get("/getSortOrderbyId", (req, res, next) => {
  db.query(
    `Select sort_order
   FROM content 
   WHERE content_id !=''`,
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

app.post("/editSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content
            SET sort_order=${db.escape(req.body.sort_order)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/editContent", (req, res, next) => {
  db.query(
    `UPDATE content
            SET title=${db.escape(req.body.title)}
            ,section_id=${db.escape(req.body.section_id)}
            ,content_type=${db.escape(req.body.content_type)}
            ,category_id=${db.escape(req.body.category_id)}
            ,sub_category_id=${db.escape(req.body.sub_category_id)}
            ,show_title=${db.escape(req.body.show_title)}
            ,published=${db.escape(req.body.published)}
            ,content_date=${db.escape(req.body.content_date)}
            ,description=${db.escape(req.body.description)}
            ,modification_date=${db.escape(
              new Date().toISOString().slice(0, 19).replace("T", " ")
            )}
            ,content_type=${db.escape(req.body.content_type)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/updateSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content SET sort_order=${db.escape(
      req.body.sort_order
    )} WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.get("/getValueFromValueList", (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text="Content Type"`,
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
app.post("/insertContent", (req, res, next) => {
  let data = {
    section_id: req.body.section_id,
    category_id: req.body.category_id,
    sub_category_id: req.body.sub_category_id,
    author_id: req.body.author_id,
    title: req.body.title,
    show_title: 1,
    type: req.body.type,
    description_short: req.body.description_short,
    description: req.body.description,
    sort_order: 0,
    published: 1,
    member_only: req.body.member_only,
    latest: req.body.latest,
    favourite: req.body.favourite,
    creation_date: new Date().toISOString(),
    modification_date: req.body.modification_date,
    content_date: req.body.content_date,
    chi_title: req.body.chi_title,
    chi_description: req.body.chi_description,
    content_type: req.body.content_type,
    external_link: req.body.external_link,
    meta_title: req.body.meta_title,
    meta_keyword: req.body.meta_keyword,
    meta_description: req.body.meta_description,
    flag: req.body.flag,
   internal_link: req.body.internal_link,
  };
  let sql = "INSERT INTO content SET ?";
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
module.exports = app;
