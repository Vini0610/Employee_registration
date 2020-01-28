let Employee = require('./employee.controller');
let router = require('express').Router();

// const router = require('express').Router();

//Doesn't work
// module.exports = function(router) {
//     router.post('/create', Employee.createEmployee);
//     router.get('/get', Employee.getEmployee);
//     router.get('/get/:id', Employee.getEmployeeById);
//     router.put('/update/:id', Employee.updateEmployee);
//     router.delete('/remove/:id', Employee.removeEmployee);
// }


router.post('/create', Employee.createEmployee);
    router.get('/get', Employee.getEmployee);
    router.get('/get/:id', Employee.getEmployeeById);
    router.put('/update/:id', Employee.updateEmployee);
    router.delete('/remove/:id', Employee.removeEmployee);
module.exports = router;