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
    res.send('Error: You must be logged in to see this information')
  }
  
});
  

export default router;
