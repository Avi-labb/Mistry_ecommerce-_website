import { ProductModel } from "../models/Product.model.js";
import { uploadCloudinary } from "../utils/Uploadfiles.js";



export const createProduct = async (req, res) => {
  try {

    const {
    name,description,price,category,stock,brand,discountPercent,isSale
    } = req.body;

    const imagespath=req.file?.path || ""   
    if(!imagespath){
      return res.status(400).json({
        message:"Image is required"
      })
    } 
    const images=await uploadCloudinary(imagespath)
    const product= await ProductModel.create({
      name,
      description,
      price,
      category,
      stock,
      brand,
      discountPercent,
      isSale,
      images:images.secure_url

    })
    

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {    
    res.status(500).json({
      message: "Product creation failed",
      error: error.message
    });

  }
};

export const GetAllproduct=async(req,res)=>{
  try {
    
    const {search ,category,sort}=req.query
    let filter ={}
    if(search){
      filter.name={ $regex:search.trim(), $options:"i"}
    }
    if(category){
      filter.category=category.trim()
    }

    let sortOption={}
    if(sort==="low"){
      sortOption.price= 1
    }

    if(sort==="high"){
      sortOption.price=-1
    }
    if(sort==="latest"){
        sortOption.createdAt=-1
    }

    const products=await ProductModel.find(filter).populate('category').sort(sortOption)    
    
    res.status(200).json({
      message:"All products",
      products,
      role:req.role
    })
  } catch (error) {
    res.status(404).json({
      message:"Product get failed",
      error:error.message,
      
    })
  }
}

export const singleProduct=async(req,res)=>{
  try {
    const product=await ProductModel.findById(req.params.id)
    if(!product){
      return res.status(404).json({
        message:"Product not  Found"
      })
    }
    res.status(200).json({
      product
    })
  } catch (error) {
    res.status(404).json({
      message:error.message
    })
  }

}

export const GetproductbyCategory=async(req,res)=>{
  
}

export const UpdateProduct=async(req,res)=>{
  try {
    const{
          name,description,price,stock,discountPercent
    }=req.body
    
    const product=await ProductModel.findById(req.params.id)
    if(!product){
      return res.status(404).json({
        message:"product not found"
      })
    }
    product.name=name,
    product.description=description,
    product.price=price,
    product.stock=stock,
    product.discountPercent=discountPercent

    
    const imagePath=req.file?.path || ""
    
    if(imagePath){
      const uploaded=await uploadCloudinary(imagePath)
      if(uploaded){
        product.images=uploaded.secure_url
      }
    }    
    await product.save()

      res.status(200).json({
        message:"Product update successfully"
      })  
  } catch (error) {
    res.status(404).json({
      message:"Product Update Failed"
    })
  }
}

export const DeleteProduct=async(req,res)=>{
  try {
        await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
          message:"Product Delete Successfully"
        })
} catch (error) {
  
        res.status(404).json({
          error:"server",error
        }) 
}
}