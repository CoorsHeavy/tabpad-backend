var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var db = req.db;
    const collection = db.get('tabs')
    collection.findOne({name: req.query.name.trim()})
    .catch((err) => {
        res.status(404).send('Server Error');
    })
    .then((doc) => {
        if(doc && doc.tabs.length){
            res.render('opener', {tabs: doc.tabs});
        }else{
            res.status(404).send('Server Error');
        }
    })
});

module.exports = router;
