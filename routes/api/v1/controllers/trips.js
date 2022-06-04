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
        if(session.isAuthenticated){
            const newTrip = new req.models.Trip({
                PrimaryUserEmail : session.account.username,
                ShoppingList: [],
                Users : [[session.account.username, session.account.name]]
            })
            console.log(newTrip)
            await newTrip.save()
            res.json({status:'success', ID: newTrip._id});
        }else{
            res.status(401).json({
                status: "error",
                error: "not logged in"
            })
        }   
    } catch (error) {
        res.status(500).send(error);
    }
});

// add a user to shopping trip
router.post('/addUser', async function (req, res, next){
    let session = req.session
    try {
        if(session.isAuthenticated){
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
        }else{
            res.status(401).json({
                status: "error",
                error: "not logged in"
            })
        }
    } catch(error) {
        res.status(500).json( {
            status: "error",
            error: "ID does not exist"
        })
    }
})

// this get method returns the session (trip) ID
router.get('/tripID', async function(req, res, next){
    try {
        let session = req.session
        let trips = await req.models.Trip.find()
        trips.forEach(trip => {
            // console.log(trip)
            for (let i = 0; i < trip.Users.length; i++) {
                if (trip.Users[i].includes(session.account.username)) {
                    console.log(trip._id)
                    res.json({tripID: trip._id})
                }
            }
        });
        // res.json({tripID: null})
    } catch(error) {
        console.log(error)

    }
})

// this delete method removes a trip from the mongoDB database
router.delete('/delete', async function(req, res, next){
    let session = req.session
    try {
        if(req.session.isAuthenticated == true){
            let tripID = req.query.tripID
            let trip = await req.models.Trip.findById(tripID)
            if(trip.PrimaryUserEmail === session.account.username){
                await req.models.List.deleteMany({tripID : tripID})
                await req.models.Trip.deleteOne({_id:tripID})
            }else{
               for(let i = 0; i < trip.Users.length; i++){
                console.log(trip.Users[i][0])
                if(trip.Users[i][0] === session.account.username){
                    console.log("found user")
                    trip.Users.splice(i,1);
                    await trip.save()
                    break;
                }
            }
            res.json({status:'success'}) 
            }
            }else{
                res.status(401).json({
                    status: "error",
                    error: "not logged in"
                })
            }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

// router.delete('/deleteUser', async function(req, res, next){
//     let session = req.session
//     try {
//         if(req.session.isAuthenticated == true){
//             let tripID = req.query.tripID
//             let trip = await req.models.Trip.findById(tripID)
            
//             res.json({status:'success'});
//             }else{
//                 res.status(401).json({
//                     status: "error",
//                     error: "not logged in"
//                 })
//             }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error);
//     }
// })

// this endpoint method calculates subtotal
router.get('/subtotal', async (req,res,next) => {
    try{
        let tripID = req.query.tripID
        let trip = await req.models.Trip.findById(tripID)
        if(trip.PrimaryUserEmail === req.session.account.username){
            let items = await req.models.List.find({tripID : tripID})
            let result = []
            console.log(trip)
            trip.Users.forEach((user) => {
                let subtotal = 0;
                console.log(user)
                items.forEach(item => {
                    item.UserEmails.forEach(userJson => {
                        if(userJson.username === user[0]){
                            console.log(item.NameOfItem, item.Quantity, item.Price)
                            subtotal += parseInt(userJson.quantity) / parseInt(item.Quantity) * parseInt(item.Price)
                        }
                    })
                })
                result.push({username: user[1], subtotal: subtotal.toFixed(2)})
            })
            console.log(result)
            res.json(result)
        }else{
            res.status(401).json({
                status: "error",
                error: "not the primary purchaser"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
})

// this endpoint method checks userStatus 
router.get('/userStatus', async(req,res,next) => {
    try{
        if (!req.session.isAuthenticated) {
            res.redirect("/mainpage")
        } else {
            let flag = false;
            let trips = await req.models.Trip.find()
            for(let i = 0; i < trips.length; i++){
                for(let j = 0; j < trips[i].Users.length; j++){
                    if(trips[i].Users[j][0] === req.session.account.username){
                        console.log("found user")
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    break;
                }
            }
            if(flag){
                console.log("about to redirect")
                res.redirect("/shoppingpage")
                return
            }else{
                res.redirect('/mainpage')
                return
            }
        } 
    }catch(error){
        throw(error)
    }
})

export default router;