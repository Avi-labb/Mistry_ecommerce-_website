import { AdminModel } from "../models/admin.model.js"
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"


export const IsAuthorize = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token"
      })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    if (!decoded) {
      return res.status(401).json({
        message: "Token Expired"
      })
    }
    if (decoded.role === "admin") {
      const admin = await AdminModel.findById(decoded.id).select("-password")

      if (!admin) {
        return res.status(401).json({ message: "Invalid Admin" })
      }

      req.admin = admin
      req.role = "admin"
    }

    else if (decoded.role === "user") {
      const user = await userModel.findById(decoded.id).select("-password")

      if (!user) {
        return res.status(401).json({ message: "Invalid User" })
      }

      req.user = user
      req.role = "user"
    }
    else {
      return res.status(403).json({
        message: "Invalid Role"
      })
    }
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: "Invalid Token"
    })
  }
}


export const allowAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      message: "Admin only access"
    })
  }
  next()
}

export const allowUser = (req, res, next) => {
  if (req.role !== "user") {
    return res.status(403).json({
      message: "User only access"
    })
  }
  next()
}