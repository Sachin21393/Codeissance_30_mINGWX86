const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require("path")
// var unirest = require("unirest");
const fs = require('fs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const multer=require("multer");
const nodemailer = require('nodemailer');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("b5141c80f9eeaefc7b0d0cfe929f036921829eb37d6d4120a6f69a9dd6b1af38");
var twilio=require('twilio');
var accountSid = "ACb8151fa1fb3b5e26dd8ee751caffe8cf"; // Your Account SID from www.twilio.com/console
var authToken ="3993072d2e46406a1fabfc209ab41c90";

const axios = require('axios');

const images = ['https://images.unsplash.com/photo-1546146830-2cca9512c68e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80','https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1561152820-340780bc049e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1493119508027-2b584f234d6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1640231912426-0d5feab0b9f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2h8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1624465991603-ea7793b4fc7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHRlY2h8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1641951820920-c90394aef512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHRlY2h8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1632383380286-80f79eb1bae1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZmVyZW5jZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1573779834530-984815d8999c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uZmVyZW5jZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1555474488-d2282fe0593f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZmVyZW5jZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1637979909766-ccf55518a928?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29uZmVyZW5jZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1603975711481-18b7aaca4caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29ya3Nob3B8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60','https://images.unsplash.com/photo-1572028412480-0a75271c6bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d29ya3Nob3B8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60']


function exportMail(receiver, subject, html){
    let info = transporter.sendMail({
        from: 'eventic update', // sender address
        to: receiver, // list of receivers
        subject: "", // Subject line
        text: "", // plain text body
        html: html, // html body
    });
}

mongoose.connect("mongodb://localhost:27017/codestormDb");
const userSchema={
    name:String,
    email:String,
    contact:String,
    events:[String],
    friends:[String],
    longitude:String,
    Latitude:String,
    interest:String,
    city:String,
    password:String,
    accepted:[String],
    decline:[String],

}
const eventSchema={
    admin:String,
    title:String,
    city:String,
    date:String,
    time:String,
    description:String,
    link:String,
    address:String,
    ticketinfo:String,
   users:[String],
    amount:String,
    img:{
        data:Buffer,
        contentType:String
    },
    capacity:String,
    mode:String,
    participating:[String] // csv


}
const User=mongoose.model('User',userSchema);
const Events=mongoose.model('Events',eventSchema);
let id;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
var storage5=multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'uploads')
	},
	filename:(req,file,cb)=>{
cb(null,file.fieldname+"-"+Date.now())
	}
});
var upload=multer({storage: storage5})

// app.get('/',(req,res)=>{
//     res.send("hjo");
// })
app.get('/events',(req,res)=>{
    Events.find({},(er,data)=>{
        if(er) console.log(er);
        else{
            res.render('events',{
              data:data,
              images : images

            });
        }
    })
})
app.get('/eventform',(req,res)=>{
    res.render('hostevent')
})
app.post('/hostEvent',upload.single('image'),(req,res,next)=>{
    let obj=new Events({
        admin:req.body.name,
        title:req.body.title,
        city:req.body.title,
        date:req.body.date,
        time:req.body.time,
        description:req.body.description,


        amount:req.body.amount,
        address:req.body.address,
        img:{

			data:fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename)),
		contentType:'image/png'
		},
        capacity:req.body.capacity,
        mode:req.body.mode,



    })
    obj.save();
    return res.json({
        data:obj
    })
})
app.post('/filter',(req,res)=>{

    let interest=req.body.interest;
    let city=req.body.city;
    if(interest!=""){
        Events.find({description:{$regex:interest,$options:'i'}},(er,data)=>{
            if(er){
                console.log(er);
            }else{
               res.render('events',{data:data,images:images})
            }
        })

    }else{
        Events.find({city:{$regex:city,$options:'i'}},(er,data)=>{
            if(er){
                console.log(er);
            }else{
                res.render('events',{data:data,images:images})
            }
        })
    }



})
let event_id;
app.post('/part',(req,res)=>{
    event_id=req.body._id;
    Events.findById(part_id,(er,data)=>{
        if(er) console.log(er);
        else{

            res.render('dashboard',{data:data})
        }
    })
})
app.get('/nearEvent.ejs',(req,res)=>{
    res.render('nearEvent')
})
app.post('/signin',(req,res)=>{
    let obj=new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        city:req.body.city,
        password:req.body.password,
        interest:req.body.interest

    })
    obj.save();
    return res.json({
        data:obj
    })

})

app.post('/register',(req,res)=>{
let event_id=req.body.event_id;
console.log(event_id);
let temp_id=id
Events.findOneAndUpdate({_id:event_id},{$push:{users:temp_id}},(er,data)=>{
 return res.json({
    obj:data
 })
 })
});
// let event_id;
app.post('/userlist',(req,res)=>{  // list to check user for particular event
event_id=req.body._id;
return res.json({
    data:event_id
    // <%=dkhfjkdf%>
})
})
app.post('/accept',(req,res)=>{
    let temp_id=req.body.id;
    User.findOneAndUpdate({_id:temp_id},{$push:{accepted:event_id}},(er,data)=>{
        if(er) console.log(er);
        else{
            console.log(data);
        }
    })
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/login',(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    User.findOne({email:email},(er,data)=>{
        if(er) console.log(er);
        else{
            if(data.password==password){
                id=data._id.valueOf()

             res.render('home1');
            }
        }
    })

})
let scrap;
app.get('/scrap',(req,res)=>{
    const params = {
        engine : "google_events",
        q: "Coding events in Mumbai",
        google_domain: "google.com",
        gl: "us",
        hl: "en"
      };

      const callback = function(data) {
        console.log("Start");
        scrap=data["events_results"];
let n=scrap.length;
// admin:String,
// title:String,
// city:String,
// date:String,
// time:String,
// description:String,
// link:String,
// users:[String],
// amount:String,
// img:{
//     data:Buffer,
//     contentType:String
// },
// capacity:String,
// mode:String,
// participating:[String] // csv
// console.log(scrap);
for(let i=0;i<n;i++){

    let obj=new Events({

        title:scrap[i].title,

        date:scrap[i].date.when,

        description:scrap[i].description,

        // amount:req.body.amount,
        address:scrap[i].address[0],
        // link:scrap[i].venue.link!=""?scrap[i].venue.link:"",
     ticketinfo:scrap[i].ticket_info[0].link!=""?scrap[i].ticket_info[0].link:""
    })
    obj.save();
    // console.log(scrap[i]);

    //    console.log(scrap[i].title);
    //    console.log(scrap[i].address[0]);
    //    console.log(scrap[i].link);


    //    console.log(scrap[i].date.when)
    //    console.log(scrap[i].description)
    //    console.log(scrap[i].ticket_info[0].link)
    //    console.log(scrap[i].venue.name)
    //    console.log(scrap[i].venue.rating)
    //    console.log(scrap[i].venue.link)





}

      };

      // Show result as JSON
      search.json(params, callback);

      axios.get('https://serpapi.com/search.json?q=events+in+Austin&google_domain=google.com&gl=us&hl=en')
        .then(res => {


        })
        .catch(error => {
          console.log("hello");
        });

})



//events near user's city
// app.post('/events_city',(req,res)=>{
//     // let city=req.body.city;
//     // Events.find({city:{$regex:city,$options:'i'}},(er,data)=>{
//     //     if(er) console.log(er);
//     //     else{
//     //         return res.json({
//     //             data:data
//     //         })
//     //     }


//     // })
// })




app.get("/confirm_appointment", async (req,res) => {
    // const doc_id = req.body.doc_id;
    const client = require('twilio')(accountSid, authToken);

    client.messages
          .create({body: 'Hello jugal you have a meetup', from: '+17273824362', to: '+919820038221'})
          .then(message => console.log(message.sid));




})

app.listen(80,()=>{
    console.log("started");
})
