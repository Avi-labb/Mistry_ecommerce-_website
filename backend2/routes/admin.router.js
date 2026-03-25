import express, { Router } from 'express'
import { AdminLogout, ChangeCurrentPassword, Forgetpassword, GetAdmin, getadminStatus, LoginAdmin, RegisterAdmin, ResetPassowrd, UpdateAvatar, UpdateData,  } from '../controlllers/Adminauth.js'
import { allowAdmin, IsAuthorize } from '../middleware/IsAdminloggedIn.js'
import { upload } from '../middleware/Uploadfile.js'

const router=express.Router()

router.post('/register',upload.fields([{name:"avatar"},{name:"coverImg"}]),RegisterAdmin)

router.post('/login',LoginAdmin)

router.get('/logout',IsAuthorize,allowAdmin,AdminLogout)

router.get('/getadmin',IsAuthorize,allowAdmin,GetAdmin)

router.post('/forget-password',Forgetpassword)

router.post('/reset-password/:token',ResetPassowrd)

router.post('/update-profile',IsAuthorize
    ,allowAdmin,UpdateData)

router.post('/update-avatar',upload.single('avatar'),IsAuthorize,allowAdmin,UpdateAvatar)

router.post('/changed-password',IsAuthorize,allowAdmin,ChangeCurrentPassword)

router.get('/Status',IsAuthorize,allowAdmin,getadminStatus)

export default router