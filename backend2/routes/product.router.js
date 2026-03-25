import express, { Router } from 'express'
import { allowAdmin, allowUser, IsAuthorize } from '../middleware/IsAdminloggedIn.js'
import { upload } from '../middleware/Uploadfile.js'
import { createProduct, DeleteProduct, GetAllproduct, singleProduct, UpdateProduct } from '../controlllers/product.js'

const router=express.Router()

router.post('/create',upload.single("images"),IsAuthorize,allowAdmin,createProduct)

router.get('/allproduct',IsAuthorize, GetAllproduct)
router.get('/:id',IsAuthorize,allowUser, singleProduct)
router.put('/update/:id',upload.single("images"),IsAuthorize, allowAdmin, UpdateProduct)
router.delete('/delete/:id',IsAuthorize, allowAdmin, DeleteProduct)



export default router