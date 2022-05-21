import express from 'express'
var router = express.Router();



router.get('/receipt', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

router.get('/bought', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

router.post('/add?', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

router.post('/addPrice', async function (req, res, next) {
    try {
        
    } catch(error) {
        res.status(500).send(error);
    }
})

export default router;
