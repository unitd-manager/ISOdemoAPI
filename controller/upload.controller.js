const upload = require("../helper/uploader");
const util = require("util");
const db = require('../config/Database.js');
const uniqid = require('uniqid');
const fs = require("fs");
const path = require('path');
const baseUrl = "http://localhost:3001/file/getFile/";
const directoryPath = __basedir + "/storage/uploads/"

exports.index = (req, res) => {
    return res.render('index', { message: req.flash() });
}

exports.uploadSingle = (req, res) => {
    if (req.file) {
        console.log(req.file)

        req.flash('success', 'File Uploaded.');
    }
    return res.redirect('/');
}

exports.uploadFile = (req, res) => {

    if (req.file == undefined) {
        return res.status(400).send({message:"Please upload a file..."});
    }

    if (req.file) {
        let data = {creation_date: new Date()
            , media_type: "attachment"
            , actual_file_name: req.file.originalname
            , display_title: req.file.originalname
            , file_name: req.file.filename
            , content_type: "attachment"
            , media_size: req.file.size
            , room_name: req.body.room_name
            , record_type: "attachment"
            , alt_tag_data: req.body.alt_tag_data
            , external_link: ""
            , caption: ""
            , uploaded: ""
            , record_id: req.body.record_id
            , modification_date: new Date()
            , description: req.body.description
          };
        console.log(req.file)
        let sql = "INSERT INTO media SET ?";
        let query = db.query(sql, data,(err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            } else {
                res.status(200).send({message:"Uploaded the file successfully : " + req.file.originalname});
            }
          });
    }
}

exports.getFileList = (req, res) => {

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
          res.status(500).send({
            message: "Unable to scan files!",
          });
        }
    
        let fileInfos = [];
    
        if(files) {
          files.forEach((file) => {
            fileInfos.push({
              name: file,
              url: baseUrl + file,
            });
          });
          res.status(200).send(fileInfos);
        }
      });    
}

exports.getFile = (req, res) => {
    const fileName = req.params.name;
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
}

exports.downloadFile = (req, res) => {
  let data = {record_id: req.body.record_id};
  let sql = "SELECT file_name FROM media WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    const fileName = result[0].file_name;
    const filePath = path.resolve(directoryPath + result[0].file_name);
    console.log("fileName : ",fileName);
    console.log("filePath : ",filePath);

    fs.readdir(filePath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      if(files) {
        files.forEach((file) => {
          fileInfos.push({
            name: file,
            url: baseUrl + file,
          });
        });
        res.status(200).send(fileInfos);
      }
    });

  });
}

exports.getFilesByRecordIdAndRoomName = (req, res) => {
  let query = db.query(`SELECT file_name FROM media WHERE record_id = ${db.escape(req.body.record_id)} AND room_name = ${db.escape(req.body.room_name)} AND record_type = ${db.escape(req.body.record_type)}`, (err, result) => {
    let fileInfos = [];
    {result ? result.map(resu => {
      const fileName = resu.file_name;
      // console.log("fileName : ",fileName);
      const filePath = path.resolve(directoryPath + resu.file_name);
      // console.log("filePath : ",filePath);
      fileInfos.push({
        name: fileName,
        url: filePath,
      });      
      fs.readdir(filePath, function (err, files) {

      });
    }) : (res.status(500).send({
      message: "Could not find the file. ",
    }))}
    // console.log("fileInfos : ",fileInfos);
    res.status(200).send(fileInfos);

  });
}

exports.removeFile = (req, res) => {
    let data = {record_id: req.body.record_id};
    let select_sql = "SELECT file_name FROM media WHERE ?";
    let query = db.query(select_sql, data,(err, result) => {
      const filePath = path.resolve(directoryPath + result[0].file_name);
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        } else {
          let delete_sql = "DELETE FROM media WHERE ?";
          let query = db.query(delete_sql, data,(err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
          });
          res.status(200).send({
            message: "File is deleted.",
          });            
        }      
      });
    });

}

exports.uploadMultiple = (req, res) => {
    if (req.files.length) {
      var arrayData = [];
      req.files.forEach(f => {
        console.log(f.filename);
        let data = {creation_date: new Date()
          , media_type: req.body.media_type
          , actual_file_name: f.originalname
          , display_title: f.originalname
          , file_name: f.filename
          , content_type: "attachment"
          , media_size: f.size
          , room_name: req.body.room_name
          , record_type: req.body.record_type
          , alt_tag_data: req.body.alt_tag_data
          , external_link: ""
          , caption: ""
          , uploaded: ""
          , record_id: req.body.record_id
          , modification_date: new Date()
          , description: req.body.description
        };
        arrayData.push(data);
      })

      arrayData.forEach(data => {
        db.query('INSERT INTO media SET ?', data, insertErr => {
          if (insertErr) {
            throw new Error("Error inserting..." + data.file_name + "! " + insertErr);
          }
          console.log(`Inserted ${data.file_name}!`);
        });
      });
      res.status(200).send({message:"Successfully uploaded multiple file"});
    }
}

exports.uploadSingleV2 = async (req, res) => {
    const uploadFile = util.promisify(upload.single('file'));
    try {
        await uploadFile(req, res);
        console.log(req.file)
        
        req.flash('success', 'File Uploaded.');
    } catch (error) {
        console.log(error)
    }
    return res.redirect('/');
  }