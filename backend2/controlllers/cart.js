import { CartModel } from "../models/cart.model.js"
import { ProductModel } from "../models/Product.model.js";


export const addToCart = async (req, res) => {
  try {

    const userId=req.user._id
    const { productId }=req.body
    
    const productData = await ProductModel.findById(productId);
    const price = productData.price;

    let cart = await CartModel.findOne({ user: userId })

    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [{ product: productId,price,quantity:1 }]
      });
      
      await cart.save()

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart
      });
    }
  
    const productItem = cart.items.find(
  item => item.product && item.product.toString() === productId
    );

    if (productItem) {
      productItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        price,
        quantity: 1
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const RemoveCart=async(req,res)=>{
    try {

        const  userId=req.user._id
        const{ productId } =req.body

       const cart=await CartModel.findOne({user:userId})
       
       if(!cart){
        return res.status(400).json({
            message:"Cart not Found"
        })
       }
       cart.items=cart.items.filter(
        item=>item.product.toString() !==productId
       )
       await cart.save()

       res.status(200).json({
        messgae:"Remove item successfully"
       })
    } catch (error) {
        res.status(400).json({
            message:"Server Error",error
        })        
    }
}

export const UpdateCart=async(req,res)=>{
    try {
        const userId=req.user._id
        const{ productId,quantity}=req.body
      
        const cart=await CartModel.findOne({user:userId})
        
        if(!cart){
                return res.status(400).json({
                messgae:"Item not found in cart"
            })
        }
        
        const item =cart.items.find(
            item=> item.product.toString() === productId
        )
        if(!item){
            return res.status(400).json({
                messgae:"Item not found in cart"
            })
        }
                item.quantity=quantity

        await cart.save()
        res.status(201).json({
            message:"Cart Updated successfully"
        })
    } catch (error) {
        res.status(404).json({
            message:"Server Error",error
        })
    }
}

export const getCart=async(req,res)=>{
        try {
            const id =req.user?._id || req.admin?._id
            
            let userId
            if(req.role==="user"){
              userId=req.user._id
            }else if(req.role==="admin"){
              userId===req.admin._id
            }
            const cart =await CartModel.findOne({ user:userId }).populate("items.product")            
            res.status(201).json({
              message:"Cart details",
              cart,
              role:req.role
            })
        } catch (error) {
          
         res.status(404).json({
          message:"Cart fetch failed", error
         })   
        }
}