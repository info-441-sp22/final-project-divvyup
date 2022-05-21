import express from 'express';
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        
        res.send("hello")
    } catch (error) {
        res.status(500).send(error)
    }
})

// this post method adds a new trip to the mongoDB database
router.post('/add', async function(req, res, next){
    
    try {
        const firstPerson = new req.models.User({
            Name : "testName",
            Email : "testEmail@gmail.com"
        })
        await firstPerson.save()
        console.log("poop1")
        const newTrip = new req.models.Trip({
            Users: [firstPerson],
            PrimaryUserEmail : "testEmail@gmail.com"
        })
        await newTrip.save()
        res.json({status:'success'});
        console.log("poop2")
    } catch (error) {
        res.status(500).send(error);
    }
})

// this get method returns the session (trip) ID
router.get('/tripID', async function(req, res, next){
    try {
        console.log("aw man")
    } catch(error) {
        res.status(500).send(error)
    }
})

// this delete method removes a trip from the mongoDB database
router.delete('/delete', async function(req, res, next){
    try {
        let tripID = req.query.tripID
        //Only allow deletion if it's the primary user
        //let trip = await req.models.trip.findById(tripID)
        //if(trip.PrimaryUserEmail == req.session.account.username){
            await req.models.Trip.deleteOne({_id:tripID})
            res.json({status:'success'});
        //}
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;