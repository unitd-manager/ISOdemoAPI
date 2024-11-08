var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
const fileUpload = require('express-fileupload');
var flash = require('connect-flash')
const session = require('express-session');

global.__basedir = __dirname;

var privateKey  = fs.readFileSync('sslcrt/server.key', 'utf8');
var certificate = fs.readFileSync('sslcrt/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
let port = 3001;
let secureport = 3002;
httpServer.listen(port, () => {
    console.log(`Server Running in port:${port}`);
  });
httpsServer.listen(secureport, () => {
    console.log(`Server Running in secure port:${secureport}`);
  });
    
var bodyParser = require('body-parser');
var cors = require('cors');
const _ = require('lodash');
const mime = require('mime-types')

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
	secret: 'my_secret',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash());


const attendance = require('./routes/attendance.js');
const product = require('./routes/product.js');
const comments = require('./routes/comments.js');
const orders = require('./routes/orders.js');
const content = require('./routes/content.js');
const setting = require('./routes/setting.js');
const valuelist = require('./routes/valuelist.js');
const subcategory = require('./routes/subcategory.js');
const category = require('./routes/category.js');
const media = require('./routes/media.js');
const section = require('./routes/section.js');
const contact = require('./routes/contact.js');
const support = require('./routes/support.js');
const isocode = require('./routes/isocode.js');
const questionmanagement = require('./routes/questionmanagement.js');
const score = require('./routes/score.js');
const GapAnalysis = require('./routes/GapAnalysis.js');
const checklist = require('./routes/checklist.js');


app.use('/attendance', attendance);
app.use('/product', product);
app.use('/comments', comments);
app.use('/orders', orders);
app.use('/category', category);
app.use('/setting', setting);
app.use('/valuelist', valuelist);
app.use('/subcategory', subcategory);
app.use('/content', content);
app.use('/media', media);
app.use('/section', section);
app.use('/contact', contact);
app.use('/support', support);
app.use('/isocode', isocode);
app.use('/questionmanagement', questionmanagement);
app.use('/score', score);
app.use('/GapAnalysis', GapAnalysis);
app.use('/checklist', checklist);


const indexRouter = require('./routes/fileUpload'); 
app.use('/file', indexRouter);

app.use(fileUpload({
    createParentPath: true
}));
module.exports = app;