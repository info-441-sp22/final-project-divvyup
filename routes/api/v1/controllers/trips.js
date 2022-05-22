import express from 'express';
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        
        res.send("hello")
    } catch (error) {
        res.status(500).send(error)
    }
});

// add a shopping trip
router.post('/add', async function(req, res, next){
    let session = req.session
    try {
        console.log("poop1")
        const newTrip = new req.models.Trip({
            PrimaryUserEmail : session.account.username,
            Users : [[session.account.username, session.account.name]]
        })
        console.log(newTrip)
        await newTrip.save()
        res.json({status:'success'});
        console.log("poop2")
    } catch (error) {
        res.status(500).send(error);
    }
});

// add a user to shopping trip
router.post('/addUser', async function (req, res, next){
    let session = req.session
    try {
        console.log("start")
        console.log(req.body.tripID)
        let trip = await req.models.Trip.findById(req.body.tripID)
        console.log(trip);
        let flag = true
        for (let i = 0; i < trip.Users.length; i++) {
            if (trip.Users[i].includes(session.account.username)) {
                flag = false
                break;
            } 
        }
        if(flag){
            trip.Users.push([session.account.username, session.account.name])
        }
        await trip.save()
        res.json({status:'success'});
    } catch(error) {
        res.status(500).send(error);
    }
})

// this get method returns the session (trip) ID
router.get('/tripID', async function(req, res, next){
    try {
        res.send()
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
        //if(trip.PrimaryUserEmail == session.account.username){
            await req.models.Trip.deleteOne({_id:tripID})
            res.json({status:'success'});
        //}
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;