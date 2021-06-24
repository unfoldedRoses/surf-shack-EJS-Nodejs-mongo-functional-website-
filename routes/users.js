var express = require('express');
var router = express.Router();
var {postRoute}=require('../controllers/index')
/* GET users listing. */
// router.get('/', postRoute
// );

router.post('/', postRoute
);


module.exports = router;
