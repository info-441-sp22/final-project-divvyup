import express from 'express'
var router = express.Router();


// returns the entire shopping list
router.get('/receipt', async function (req, res, next) {
    try {
        if(req.session.isAuthenticated == true){
            let receipt = await req.models.List.find({tripID : req.query.tripID})
            res.json(receipt)
        }else{
            res.status(401).json({
                tatus: "error",
                error: "not logged in"
            })
        }
    } catch(error) {
        res.status(500).send(error);
    }
})

// returns whether an item was bought
router.post('/bought', async function (req, res, next) {
    try {
        if(req.session.isAuthenticated == true){
            console.log(`itemID: ${req.query.itemID}`)
            let lists = await req.models.List.findById(req.query.itemID)
            console.log(`list: ${lists}`)
            lists.Bought = true
            await lists.save()
            res.json({status:'success'});
        }else{
            res.status(401).json({
                tatus: "error",
                error: "not logged in"
            })
        }
    } catch(error) {
        res.status(500).send(error);
    }
})

// adds item to the current trip's shopping list (quantity being the query)
router.post('/add?', async function (req, res, next) {
    let session = req.session
    try {
        if(req.session.isAuthenticated == true){
            console.log(req.query.item)
            console.log(req.query.quantity)
            console.log(req.query.tripID)
            let lists = await req.models.List.find({NameOfItem : req.query.item, tripID : req.query.tripID})
            if (lists.length == 0) {
                const shoppinglist = new req.models.List({
                    tripID : req.query.tripID,
                    NameOfItem : req.query.item,
                    UserEmails : [session.account.username],
                    Quantity : req.query.quantity,
                    Price : 0,
                    Bought : false
                })
                await shoppinglist.save()
                let trip = await req.models.Trip.findById(req.query.tripID)
                trip.ShoppingList.push(shoppinglist)
                await trip.save();
            } else {
                lists[0].Quantity += parseInt(req.query.quantity)
                lists[0].UserEmails.push(session.account.username)
                await lists[0].save()
            }
            res.json({status:'success'});
        }else{
            res.status(401).json({
                tatus: "error",
                error: "not logged in"
            })
        }
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
})

// addPrice, queryparam: itemID, price
router.post('/addPrice', async function (req, res, next) {
    try {
        if(req.session.isAuthenticated == true){
            let lists = await req.models.List.findById(req.query.itemID)
            let price = req.query.price
            lists.Price = price
            await lists.save()
            res.json({status:'success'});
        }else{
            res.status(401).json({
                tatus: "error",
                error: "not logged in"
            })
        } 
    } catch(error) {
        res.status(500).send(error);
    }
})

export default router;
