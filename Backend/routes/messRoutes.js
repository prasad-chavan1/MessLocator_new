const router = require('express').Router();
let Mess = require("../models/Mess");


router.route('/').get((req, res) => {
  Mess.find()
  .then(messes => res.json(messes))
  .catch(err => res.status(400).json('Error: ' + err)); 
});


router.route('/register').post((req, res) => {
//   console.log(req.body);
  const messName = req.body.messname;
  const phone = Number(req.body.phone);
  const clgName = req.body.clgname;
  const location = req.body.location;
  const password = req.body.password; 
  const email = req.body.email;
  const ownerName = req.body.ownername;
  const halfTime = req.body.halftime;
  const fullTime = req.body.fulltime;
  const url = req.body.url;

  var query = {email: email};
    Mess.findOne(query, function(err, mess){
        if(err) throw new Error(err);
        if(mess){
            res.status(500).json("username already exists");
        }
        else{
            const newMess = new Mess({
                messName,
                clgName,
                phone,
                location,
                password,
                email,
                ownerName,
                halfTime,
                fullTime,
                url
              });
            
              newMess.save()
              .then(() => res.json('Mess added!'))
              .catch(err => res.status(400).json('Error: ' + err));

        }
    })
});

router.post("/login",(req,res)=>{
    const {username,password} = req.body;
      var query = {email: username};
      Mess.findOne(query, function(err, mess){
          if(err) throw new Error(err);
          if(!mess){
              res.status(500).json("mess not found");
          } 
          else {
              if(mess.password == password){
                  res.status(200).json(mess);
              }
              else{
                  res.status(401).json("wrong password");
              }
          }
      })
  });

router.route('/:id').get((req, res) => {
  Mess.findById(req.params.id)
  .then(mess => res.json(mess))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  Mess.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mess deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Mess.findById(req.params.id)
    .then(mess => {
        mess.name = req.body.name;
        mess.address = req.body.address;
        mess.phone = Number(req.body.phone);
        mess.clgName = req.body.clgName;

      mess.save()
        .then(() => res.json('Mess updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/search/:clgName",(req,res)=>{
  Mess.find({clgName:req.params.clgName})
  .then(messes => res.json(messes))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;