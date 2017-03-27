var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:session_id/', function(req, res, next) {
    var db = req.db;
    const collection = db.get('tabs')
    console.log(req.params.session_id);
    collection.findOne({name: req.params.session_id.trim()})
    .catch((err) => {
        res.status(404).send('');
    })
    .then((doc) => {
        console.log(doc);
        if(doc && doc.tabs.length){
            res.render('open', { title: 'Express', name: req.params.session_id.trim(), tabs: doc.tabs });
        }else{
            res.render('empty', { title: 'Express', name: req.params.session_id.trim() });
        }
    })

});

module.exports = router;
