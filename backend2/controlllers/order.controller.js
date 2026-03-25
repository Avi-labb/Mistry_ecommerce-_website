import { AddressModel } from "../models/address.model.js"
import { CartModel } from "../models/cart.model.js"
import { Order } from "../models/order.model.js"



export const createOrder=async(req,res)=>{
    try {
        const UserId=req.user._id
        const {addressId,paymentMethod}=req.body
        
        const cart =await CartModel.findOne({user:UserId}).populate('items.product',"discountPercent")
        if(!cart || cart.length===0){
            return res.status(400).json({
                message:"Cart is empty"
            })
        }
                
        const address= await AddressModel.findOne({
            _id:addressId,
            user:UserId
        })

        if(!address){
            return res.status(404).json({
                message:"Address not found"
            })
        }

        const Address={ name: address.name,
        phonenumber: address.phonenumber,
        building_name: address.building_name,
        road_name: address.road_name,
        near_by: address.near_by,
        city: address.city,
        pin: address.pin,
        state: address.state,}        

        let totalamount=0

        const items = cart.items.map((item) => {          
          const product = item.product;
          const price=item.price
          const discountpercent=product.discountPercent |0
          const  discountPrice=
          price-(price*discountpercent)/100
          totalamount=discountPrice*item.quantity

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const order=await Order.create({
        user:UserId,
        items:items,
        address:Address,
        paymentMethod,
        paymentStatus:paymentMethod==="cod"?"pending":"Complete",
        totalamount,
        orderStatus:"placed"
    })
    
    cart.items=[]
    await cart.save()

    res.status(201).json({
        message:"Order placed Successfully",
        order
    })
    } catch (error) {
      console.log(error);
      
        res.status(500).json({
            message:error.message
        })
    }
}


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).populate("items.product","images name price")
    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { returnDocument: "after" }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};