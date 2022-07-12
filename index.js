const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();    
var bodyParser = require('body-parser');   
const cors =require('cors');
var bcrypt =require("bcryptjs");

var morgan = require("morgan");  

 var multer =require('multer');
var db = require("./config.js");  
var mongoose = require('mongoose');  
global.__basedir = __dirname;
 var Schema = mongoose.Schema;  

var postSchema = new Schema({      
  avater: { type: String   },       
  photo: { type: String   },     
  doxtype: { type: String },       
  description: { type: String },       
  name: { type: String },
  createdAt: { type: String },       
},{ versionKey: false }); 

var studentSchema = new Schema({      
  first_name: { type: String   },     
  middle_name: { type: String   },     
  surname_name: { type: String   },     
  phone_no: { type: String   },     
  college: { type: String },       
  email: { type: String },       
  gender: { type: String },       
  id_no: { type: String },
  course: { type: String },
  year_of_enrollment: { type: String },     
  password: { type: String },    
  active: { type: String },     
},{ versionKey: false }); 

var teacherSchema = new Schema({      
  first_name: { type: String   },     
  middle_name: { type: String   },     
  surname_name: { type: String   },     
  phone_no: { type: String   },     
  college: { type: String },       
  email: { type: String },       
  gender: { type: String },       
  department: { type: String },
  course: { type: String },
  building: { type: String },
  office_no: { type: String },       
  password: { type: String },
  status: { type: String },     
  active: { type: String },     
},{ versionKey: false });  

var sessionSchema = new Schema({      
  date: { type: String   },       
  Assistance_tutor: { type: String   },     
  course_name: { type: String },       
  tutor: { type: String },
  course_code: { type: String }, 
  venue: { type: String },
  time: { type: String },
  phone_no: { type: String },
  total_students: { type: String },
},{ versionKey: false });

var documentSchema = new Schema({      
  name: { type: String   },       
  type: { type: String   },    
  attachment: { type: String   },
  course_name: { type: String   },
  createdAt: { type: String   }, 
},{ versionKey: false });

var assignmentSchema = new Schema({      
  due_date: { type: String   },       
  createdAt: { type: String   },    
  class_name: { type: String   },    
  course_name: { type: String   },    
  assignment_name: { type: String   },    
  type: { type: String   },    
  attachment: { type: String   },    
},{ versionKey: false });
   
const fileWorker = require('./app/controllers/file.controller.js');
var upload = require('./app/config/multer.config.js');
//var notification = require('./firebaseNotification.js');

var modelstudent = mongoose.model('student', studentSchema, 'student');  
var modelteacher = mongoose.model('teacher', teacherSchema, 'teacher'); 
var modelpost = mongoose.model('post', postSchema, 'post'); 
var modelsession = mongoose.model('session', sessionSchema, 'session'); 
var modeldocument = mongoose.model('document', documentSchema, 'document'); 
var modelassignment = mongoose.model('assignment', assignmentSchema, 'assignment'); 

var admin = require("firebase-admin");

var serviceAccount = require("./homecare-d555c-firebase-adminsdk-fo9y6-2c54b82aef.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

 async function sendNotificationEvent(){

	try{
var payload = {notification : {title:'Fcm using flutter and node',
body:'wea are fine now'},
data:{click_action : "FLUTTER_NOTIFICATION_CLICK"}}
console.log("data",payload);
await admin.messaging().sendToTopic('Events',payload);
}
catch (error){
console.log(error);
}

}


//express()
  app.use(cors({origin:'*'}));
  app.use(bodyParser.json({limit:'5mb'}));    
  app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.get('/api/users', function (req, res) {
    let user=[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }];
      res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
          res.setHeader('Content-Range', 5);
         // res.send({ data: categories, total: 5 });
    res.send({data:user})
  })

  //api for get teacher from database  
app.get("/api/getteacher",function(req,res){   
  modelteacher.find({},{password:0},function(err,data){
 
   //res.set('Access-Control-Allow-Origin','*');  
             if(err){  
                 res.send(err);  
             }  
             else{             
                 res.send(data);  
                 }  
         });  
 }) 
 
 //api for get students from database  
 app.get("/api/getstudent",function(req,res){   
   modelstudent.find({},{password:0},function(err,data){
 
   //res.set('Access-Control-Allow-Origin','*');  
             if(err){  
                 res.send(err);  
             }  
             else{             
                 res.send(data);  
                 }  
         });  
 }) 
 
 
  //api for admin login existing from database  
 app.post("/api/adminlogin",async(req,res)=>{  
   
  const {password,email,status}=req.body;
  // Validate if user exist and is admin in our database
  const teacher = await modelteacher.findOne({ email,status });
  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    

    // user
    res.status(200).send({data:teacher});
   }
   res.send({data:"no teacher"});
  }) 
 
  //api for student login existing from database  
 app.post("/api/studentlogin",async(req,res)=>{  
   res.set('Access-Control-Allow-Origin','*');  
   const {password,id_no}=req.body;
   // var encryedpassword = await bcrypt.hash(password,10);
   // Validate if user exist in our database
   const student = await modelstudent.findOne({ id_no });
   if (student && (await bcrypt.compare(password, student.password))) {
    

    // user
    res.status(200).send({data:student});
   }
  res.status(400).send({data:"no student"});
   
  }) 

  //api for teacher login existing from database  
 app.post("/api/teacherlogin",async(req,res)=>{  
  res.set('Access-Control-Allow-Origin','*');  
  const {password,email}=req.body;
  // var encryedpassword = await bcrypt.hash(password,10);
  // Validate if user exist in our database
  const teacher = await modelteacher.findOne({ email });
  if (teacher && (await bcrypt.compare(password, teacher.password))) {
   

   // user
   res.status(200).send({data:teacher});
  }
 res.status(400).send({data:"no teacher"});
  
 })

  //api for reset student password from database  
 app.post("/api/resetstudentpass",async(req,res)=>{  
  res.set('Access-Control-Allow-Origin','*');  
  const {password,oldpassword,id_no}=req.body;
  var encryedpassword = await bcrypt.hash(password,10);
  // find user by id
  const student = await modelstudent.findOne({ id_no:id_no });
  if (student && (await bcrypt.compare(oldpassword, student.password))) {
     //update user password
    modelstudent.findByIdAndUpdate(id, { password:  encryedpassword,},   
      function(err) {  
       if (err) {  
       res.send(err);  
       return;  
       }  
       res.status(200).send({data:"Record has been Updated..!!"});  
       });  
  }
  else{
    res.status(400).send({data:"no student"});
  }
 
 })


  //api for all session with finish from database  
 app.get("/api/session",function(req,res){  
  //res.set('Access-Control-Allow-Origin','*');  
  console.log("data: ",req.body);
  modelsession.find({},  
 function(err,data) {  
  if (err) {  
  res.send({data:err});  
  
  } 
  else if(data.length > 0){
   res.send({data:data});  
  }
  else{
    res.send({data:"no session"});
  }
  });  
 }) 


   //api for all assignment without finish from database  
 app.get("/api/assignment",function(req,res){  
  //res.set('Access-Control-Allow-Origin','*');  
  console.log("data: ",req.body);

  model.find({},    
 function(err,data) {  
  if (err) {  
  res.send({data:err});  
  
  } 
  else if(data.length > 0){
   res.send({data:data});  
  }
  else{
    res.send({data:"no assignment"});
  }
  });  
 }) 

  //api for staff document from database  
 app.post("/api/document",function(req,res){  
  //res.set('Access-Control-Allow-Origin','*');  
  console.log("data: ",req.body);
  modeldocument.find({},  
 function(err,data) {  
  if (err) {  
  res.send({data:err});  
  
  } 
  else if(data.length > 0){
   res.send({data:data});  
  }
  else{
    res.send({data:"no document"});
  }
  });  
 }) 


 //api for  post from database  
 app.get("/api/post",function(req,res){  
   //res.set('Access-Control-Allow-Origin','*');  
   //console.log("data: ",req.body);
   modelpost.find({},   
  function(err,data) {  
   if (err) {  
   res.send({data:err});  
   
   } 
   else if(data.length > 0){
    res.send({data:data});  
   }
   else{
     res.send({data:"no post"});
   }
   });  
  }) 
   
   
 //api for Delete post from database  deleteOne
 app.post("/api/Removepost",function(req,res){   
 // model.remove({ _id: req.body.id }, function(err) {
   console.log("data: ",req.body.id);
  modelpost.deleteOne({ _id: req.body.id }, function(err) { 
   //res.set('Access-Control-Allow-Origin','*');  
   
             if(err){  
                 res.send(err);  
             }  
             else{    
                    res.send({data:"Post has been Deleted..!!"});             
                }  
         });  
 }) 
 
 
 //api for Delete session from database  deleteOne
 app.post("/api/Removesession",function(req,res){   
 // model.remove({ _id: req.body.id }, function(err) {
   console.log("data: ",req.body.id);
  modelsession.deleteOne({ _id: req.body.id }, function(err) { 
   //res.set('Access-Control-Allow-Origin','*');  
   
             if(err){  
                 res.send(err);  
             }  
             else{    
                    res.send({data:"Session has been Deleted..!!"});             
                }  
         });  
 })
 
 
 //api for Delete assignment from database  deleteOne
 app.post("/api/Removeassignment",function(req,res){   
  // model.remove({ _id: req.body.id }, function(err) {
    console.log("data: ",req.body.id);
   modelassignment.deleteOne({ _id: req.body.id }, function(err) { 
    //res.set('Access-Control-Allow-Origin','*');  
    
              if(err){  
                  res.send(err);  
              }  
              else{    
                     res.send({data:"Assignment has been Deleted..!!"});             
                 }  
          });  
  })
 
 //api for Delete document from database  deleteOne
 app.post("/api/Removedocument",function(req,res){   
 // model.remove({ _id: req.body.id }, function(err) {
   console.log("data: ",req.body.id);
  modeldocument.deleteOne({ _id: req.body.id }, function(err) { 
   //res.set('Access-Control-Allow-Origin','*');  
   
             if(err){  
                 res.send(err);  
             }  
             else{    
                    res.send({data:"Document has been Deleted..!!"});             
                }  
         });  
 }) 
 
  
   
 /*app.post('/api/upload',upload.single('image'),function(req,res){
   console.log(req.file,req.body)
 })*/
 app.post('/api/files/upload', upload.single("image"), fileWorker.uploadFile);
 
 app.get('/api/files/getall', fileWorker.listAllFiles);
 
 app.get('/api/files/:filename', fileWorker.readFiles);
 
 app.post('/api/photo',function(req,res){
   upload(req,res,function(err){
     if(err){
       return res.send("error uploading file");
     }
     res.send("file is uploaded");
   })
 })
  
   
 //api for Insert post from database  
 app.post("/api/savepost",function(req,res){   
   //res.set('Access-Control-Allow-Origin','*'); 
   console.log("data: ",req.body);
     var mod = new modelpost(req.body);  
     
         mod.save(function(err,data){  
             if(err){  
                 res.send(err);                
             }  
             else{        
                  res.send({data:"Post has been Inserted..!!"});  
             }  
         });  
 }) 
 
 //api for Insert session from database  
 app.post("/api/savesession",function(req,res){   
   //res.set('Access-Control-Allow-Origin','*'); 
   console.log("data: ",req.body);
     var mod = new modelsession(req.body);  
     
         mod.save(function(err,data){  
             if(err){  
                 res.send(err);                
             }  
             else{        
                  res.send({data:"Session has been Inserted..!!"});  
             }  
         });  
 })  

 //api for Insert assignment from database  
 app.post("/api/saveassignment",function(req,res){   
  //res.set('Access-Control-Allow-Origin','*'); 
  console.log("data: ",req.body);
    var mod = new modelassignment(req.body);  
    
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Assignment has been Inserted..!!"});  
            }  
        });  
}) 
 
 //api for Register student data from database  
 app.post("/api/registerstudent",async(req,res)=>{   
  // res.set('Access-Control-Allow-Origin','*'); 
  
  const { first_name, middle_name, surname_name, gender, id_no, phone_no, college, course, active, email, year_of_enrollment, password } = req.body;
  // Validate if user exist in our database
  const oldstudent = await modelstudent.findOne({ id_no });

    if (oldstudent) {
      return res.send({data:"Student Already Exist"});
    }

   var encryedpassword = await bcrypt.hash(password,10);
   // Create student in our database

   console.log("data: ",req.body);
    // Create student in our database
    var mod = new modeluser({
      first_name,
      middle_name,
      surname_name,
      gender,
      year_of_enrollment,
      active,
      college,
      course,
      phone_no,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryedpassword,
    });  
     
    mod.save(function(err,data){  
        if(err){  
            res.send({data:err});                
        }  
        else{        
            res.send({data:"Student has been Inserted..!!"});  
        }  
    });  
 })


 //api for Register student data from database  
 app.post("/api/registerteacher",async(req,res)=>{   
  // res.set('Access-Control-Allow-Origin','*'); 
  
  const { first_name, middle_name, surname_name, gender, phone_no, college, course, department, building, status, office_no, active, email, password } = req.body;
  // Validate if user exist in our database
  const oldteacher = await modelteacher.findOne({ email });

    if (oldteacher) {
      return res.send({data:"Teacher Already Exist"});
    }

   var encryedpassword = await bcrypt.hash(password,10);
   // Create teacher in our database

   console.log("data: ",req.body);
    // Create teacher in our database
    var mod = new modeluser({
      first_name,
      middle_name,
      surname_name,
      gender,
      department,
      building,
      active,
      college,
      course,
      office_no,
      status,
      phone_no,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryedpassword,
    });  
     
    mod.save(function(err,data){  
        if(err){  
            res.send({data:err});                
        }  
        else{        
            res.send({data:"Teacher has been Inserted..!!"});  
        }  
    });  
 })
 
 //api for Insert document data from database  
 app.post("/api/savedocument",function(req,res){   
  // res.set('Access-Control-Allow-Origin','*'); 
   console.log("data: ",req.body);
     var mod = new modeldocument(req.body);  
     
         mod.save(function(err,data){  
             if(err){  
                 res.send({data:err});                
             }  
             else{        
                  res.send({data:"Document has been Inserted..!!"});  
                  //notification.sendNotificationEvent;
             }  
         }); 
 })

  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
