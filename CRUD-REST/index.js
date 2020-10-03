var express= require('express');
var app=express();
const bodyParser=require("body-parser");
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbName='hospital';
const middleware=require("./middleware");
const server=require("./server");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//let db
//MongoClient.connect(url, (err,client)=>{
  //  if(err) return console.log(err);
    //db=client.db(dbName);
//db.collection('HospDet', function (err, collection) {
        
   // collection.insertOne({"hId":"H1",
   // "name": "Apollo hospital",
    // "location":"17.398644, 78.484334",
    // "address": "Plot No. 3-5-874/1 Near, Old MLA Quarters Rd, Hyderguda,Hyderabad,Telangana 500029",
    //"contactNo": "040-23231380"
//});
//add "VentDet" details
app.post('/status',middleware.checkToken, (req, res) => {

    db.collection("VentDet", function (err, collection) {
       
       collection.find({"status":req.body.s}).toArray(function(err, obj) {
        if(err) throw err;    
        res.send(obj);            
    });
    
        });
    });
    app.post('/hospitalname',middleware.checkToken, (req, res) => {

        db.collection("VentDet", function (err, collection) {
           
           collection.find({"name":req.body.hn}).toArray(function(err, obj) {
            if(err) throw err;    
            res.send(obj);            
        });
            });
        });
        app.post('/hospname',middleware.checkToken, (req, res) => {

            db.collection("HospDet", function (err, collection) {
               
               collection.find({"name":req.body.hn}).toArray(function(err, obj) {
                if(err) throw err;    
                res.send(obj);            
            });
                });
            });  

       app.put('/updateVentDetails',middleware.checkToken,(req,res)=>{
        db.collection("VentDet", function (err, collection) {
        
            collection.update({"ventilatorId":req.body.vid}, { $set: {"status" : req.body.vcs} },
        function(err, result){
        if(err) throw err;    
        res.send('Document Updated Successfully');
        });
            });
        });
        app.post('/addingDetials',middleware.checkToken,(req,res)=>
        {
            db.collection("VentDet",function(err,collection)
            {
                collection.insert({ "hId" :req.body.hid,
                "ventilatorId" : req.body.vid,
                "status" : req.body.st,
                "name" : req.body.hnm}).then(result => res.json(result));
            });
        });
        app.get('/hospitaldata',middleware.checkToken, (req, res) => {
            db.collection("HospDet").find().toArray().then(result => res.json(result));
            });
        app.get('/ventilatordata',middleware.checkToken, (req, res) => {
            db.collection("VentDet").find().toArray().then(result => res.json(result));
            });
        app.delete('/removeVentilator',middleware.checkToken,(req,res)=>
        {
            db.collection("VentDet",function(err,collection)
            {
                collection.remove({"ventilatorId":req.body.vid}).then(result => res.json(result));
            });
        });

    app.listen(3000);
    


});






