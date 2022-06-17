const router = require('express').Router();
let User = require("../models/User");


router.route('/').get((req, res) => {
  User.find()
  .then(messes => res.json(messes))
  .catch(err => res.status(400).json('Error: ' + err)); 
});


router.route('/register').post((req, res) => {
  const userName = req.body.username;
  const phone = Number(req.body.phone);
  const clgName = req.body.clgName;
  const password = req.body.password; 
  const email = req.body.email;
  const name = req.body.name;

    var query = {userName: userName};
    User.findOne(query, function(err, user){
        if(err) throw new Error(err);
        if(user){
            res.status(500).json("username already exists");
        } 
    })

  const newUser = new User({
    name,
    userName,
    phone,
    clgName,
    password,
    email,
  });

  newUser.save()
  .then(() => res.json('User registered!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get((req, res) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => res.json(user))
  // .then(console.log(req.params.name))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Mess.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mess deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post("/login",(req,res)=>{
  const {username,password} = req.body;
    var query = {userName: username};
    User.findOne(query, function(err, user){
        if(err) throw new Error(err);
        if(!user){
            res.status(500).json("user not found");
        } 
        else {
            if(user.password == password){
                res.json(user);
            }
            else{
                res.status(401).json("wrong password");
            }
        }
    })
})

module.exports = router;