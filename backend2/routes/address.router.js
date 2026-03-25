import  express from 'express'
import { getAdress, Saveadress, updateAddress } from '../controlllers/address.js'
import { allowUser, IsAuthorize } from '../middleware/IsAdminloggedIn.js'

const router=express.Router()

router.post('/add',IsAuthorize,allowUser,Saveadress)

router.get("/get",IsAuthorize,allowUser,getAdress)

router.put('/update/:id',IsAuthorize,allowUser,updateAddress)
export default router