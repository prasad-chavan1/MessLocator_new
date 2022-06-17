const router = require('express').Router();
let Menu = require("../models/Menu");


router.route('/items/:id').get((req, res) => {
    const messID = req.params.id;
    console.log(messID);
    Menu.findOne({messID:messID})
    .then(menu => res.json(menu))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
//   console.log(req.body);
  const {item1,item2,item3,item4,item5,item6,messID} = req.body;

  var query = {messID: messID};

  Menu.findOne(query, function(err, menu){
      if(err) throw new Error(err);
      var query = {messID: messID};
      if(menu){
          Menu.deleteOne(query,function(err,res){
            if(err) throw new Error(err);
            else console.log(res);
          })
      } 
      // if not then

    const newMenu = new Menu({
        item1,item2,item3,item4,item5,item6,messID
    });

    newMenu.save()
    .then(() => res.json('Menu added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })


});

module.exports = router;