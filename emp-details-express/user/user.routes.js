let User = require('./user.controller');
let router = require('express').Router();

//doesn't work
// module.exports = function(router){
//     router.post('/create', User.CreateUser);
// }

router.post('/create', User.createUser);
router.get('/get', User.getUser);
router.get('/get/:id', User.getUserById);
router.delete('/remove/:id', User.removeUser);

module.exports = router;