import express from 'express'
var router = express.Router();


// returns the entire shopping list
router.get('/receipt', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

// returns whether an item was bought
router.get('/bought', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

// adds item to the current trip's shopping list (quantity being the query)
router.post('/add?', async function (req, res, next) {
    let session = req.session
    try {
        console.log(req.query.item)
        console.log(req.query.quantity)
        console.log(req.query.tripID)

        let lists = await req.models.List.find({NameOfItem : req.query.item, SessionID : req.query.tripID})
        
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
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
})

// addPrice
router.post('/addPrice', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

export default router;
