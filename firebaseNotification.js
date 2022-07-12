
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

await admin.messaging().sendToTopic('all',payload);
}
catch (error){
console.log(error);
}

}

