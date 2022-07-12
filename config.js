/*const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb://usuyxwwxdlznqahrz2nw:PuHK2mkgbXJsuW305h2@bkpy7ngs7h2yix2nmv1h-mongodb.services.clever-cloud.com:2372/bkpy7ngs7h2yix2nmv1h";
const client = new MongoClient(url);

var db =   
client.connect(function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;*/

/*async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);*/

/*
var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://localhost:27017/kampusplus", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;
*/
/*
var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb+srv://samfinance:tinadavid@homecare.or9hu.mongodb.net/homecare?retryWrites=true&w=majority", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;
*/
/*
const { MongoClient } = require('mongoose');
const uri = "mongodb://usuyxwwxdlznqahrz2nw:PuHK2mkgbXJsuW305h2@bkpy7ngs7h2yix2nmv1h-mongodb.services.clever-cloud.com:2372/bkpy7ngs7h2yix2nmv1h";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

//module.exports =db;
//runing online

var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://uakqtnylpyp7qahad9l0:2TfFM8uOHZTqO1oNfUiQ@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bhjj1efwzmvbkle?replicaSet=rs0", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
 
module.exports =db;
