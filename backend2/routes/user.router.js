import express, { Router } from 'express'
import { Forgetpassword, Getuser, LoginUser, LogoutUser, RefreshToken, registerUser, ResetPassword } from '../controlllers/authoried.js'
import {  allowUser, IsAuthorize } from '../middleware/IsAdminloggedIn.js'

const router=express.Router()

router.post('/register',registerUser)

router.post('/login',LoginUser)

router.get('/details',IsAuthorize,Getuser)

router.get('/logout',IsAuthorize,allowUser,LogoutUser)

router.get('/refresh-token',RefreshToken)

router.post('/forget-pass',Forgetpassword)

router.post('/reset-password/:token',ResetPassword)

export default router