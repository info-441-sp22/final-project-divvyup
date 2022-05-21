import express from 'express'
var router = express.Router();

/* GET users listing. */
// router.get('/myIdentity', function(req, res, next) {
//     console.log("here!")
//   let session = req.session
//   if(session.isAuthenticated){
//     res.type('json')
//     let statusJSON = {
//         status: "loggedin", 
//         userInfo: {
//            name: session.account.name, 
//            username: session.account.username
//          }
//     }
//     let div = document.getElementById("status")
//     div.innerHTML = `username: ${session.account.username}`
//     res.send(statusJSON)
//   } else {
//     res.type('json')
//     res.send({ status: "loggedout" })
//   }
// })


// router.get('/users', async function (req, res, next) {
//     try {
        
//     } catch(error) {
//         res.status(500).send(error);
//     }
// })


router.post('/add?', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

router.delete('/delete?', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

export default router;
