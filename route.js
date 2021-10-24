const express=require('express')
const router=express.Router()

const control=require('./control')


router.get('/sales',control.getsales)
router.post('/sales',control.sales)
router.post('/addsales',control.addsales)


router.post('/createorder',control.order)
router.get('/getorder',control.getorder)


router.post('/composition',control.composition )
router.get('/getcomposition',control.getcomposition )
router.post('/updatecomposition',control.updatecomposition )
router.post('/deletecomposition',control.deletecomposition )

router.get('/report',control.report)

router.post('/add',control.add)
router.get('/getitems',control.getitems)
router.post('/update',control.update)
router.post('/deleteitems',control.deleteitems)

router.post('/login',control.login)
router.post('/register',control.register)
router.get('/',control.welcome)



module.exports=router;