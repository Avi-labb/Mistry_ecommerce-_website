import express from 'express'
import { addToCart, getCart, RemoveCart, UpdateCart } from '../controlllers/cart.js'
import {  allowUser, IsAuthorize } from '../middleware/IsAdminloggedIn.js'

const router=express.Router()

router.post('/add-to-cart',IsAuthorize,allowUser ,addToCart)

router.get('/show-cart',IsAuthorize ,getCart)

router.post('/remove-to-cart',IsAuthorize,allowUser,RemoveCart)

router.post('/update',IsAuthorize,allowUser,UpdateCart)


export default router