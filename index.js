const express = require('express');
const mongoose = require('mongoose');
const Bike = require('./models/bike.model');
const fs = require("fs");
const multer = require("multer");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/getBikes", (req,res)=>{
    Bike.find({},(err,result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

app.post("/addBikes",upload.single("testImage") ,(req,res)=>{
   
    const saveBike =  Bike({
      bikeName :req.body.bikeName,
      name: req.body.name,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/jpg",
      },
      price:Number(req.body.price),
      discount:req.body.discount,
      charges:req.body.charges,
    });
    saveBike
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('image is saved')
});


app.get('/:id',(req, res) => {
    Bike.findById(req.params.id)
      .then(Bike => res.json(Bike))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  app.delete('/:id',(req, res) => {
    Bike.findByIdAndDelete(req.params.id)
      .then(() => res.json('Bike deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  app.patch('/update/:id',upload.single("testImage"),(req, res) => {
    Bike.findByIdAndUpdate(req.params.id,{
      new:true,
      runValidators : true
    })
      const saveBike =  Bike({
        bikeName :req.body.bikeName,
        name: req.body.name,
        image: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/jpg",
        },
        price:Number(req.body.price),
        discount:req.body.discount,
        charges:req.body.charges,
      });
      saveBike
        .save()
      
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      // .catch(err => res.status(400).json('Error: ' + err));
  // });

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});