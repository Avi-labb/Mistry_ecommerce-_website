import express from 'express'
import { createOrder, getUserOrders, updateOrderStatus } from '../controlllers/order.controller.js'
import { allowUser, IsAuthorize } from '../middleware/IsAdminloggedIn.js'

const router=express.Router()

router.post('/create',IsAuthorize,allowUser,createOrder)
router.get('/get',IsAuthorize,allowUser,getUserOrders),
router.put('/update',IsAuthorize,allowUser,updateOrderStatus)

export default router