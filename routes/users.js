import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session
  if(session.isAuthenticated){
    res.json({
    name: session.account.name,
    username: session.account.username
    });
  } else {
    res.json({
    name: null,
    username: null
    })
  }
  
});

// router.get('/loggedIn', function(req, res, next) {
//   let session = req.session
//   if(session.isAuthenticated){
//       return(true);
//   } else {
//     return(false);
//   }
  
// });
  
export default router;
