var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {

    var db = req.db;
    var name = req.body.name.trim();
    var tabs = JSON.parse(req.body.tabs);
    console.log(name.trim());
    if(!tabs || !name.trim()){
        res.status(404).send("Either no name or no tabs have been assigned.");
        return;
    }
    console.log(tabs);
    const collection = db.get('tabs')
    collection.findOneAndUpdate({"name": name},{"name": name, "tabs": tabs, "date_created": new Date()})
    .catch((err) => {
        res.status(404).send('Server Error');
    })
    .then((newDoc) => {
        console.log(newDoc);
        if(newDoc.name) {
            res.status(200).send("tabpad.me/"+name);
        }else{
            collection.insert({"name": name, "tabs": tabs, "date_created": new Date()})
            .then((freshDoc) => {
                res.status(200).send("tabpad.me/"+name);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send('Server Error');
            })
        }
    });


});

module.exports = router;
