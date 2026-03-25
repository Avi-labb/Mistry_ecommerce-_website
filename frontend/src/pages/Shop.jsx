import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import api from "../api/axios"

const Shop = () => {

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [loading, setloading] = useState(false)
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [admin, setadmin] = useState("")
  const [edit, setedit] = useState(false)
  
  
  const Loadproduct = async () => {

    const res = await api.get(`/product/allproduct?search=${search}&category=${category}&sort=${sort}`,
    )
    setProducts(res.data.products)
    setadmin(res.data.role);

  }
  useEffect(() => {
    Loadproduct()
  }, [search, category, sort])


  const [form, setform] = useState({
    name:"",
    price:"",
    stock:"",
    description:"",
    discountPercent:"",
    images:null
  })
  const handlechange=async(e)=>{
    const {name, files,value}=e.target
    if(files)
      {setform({...form,[name]:files[0]})
  }else{
    setform({...form, [name]:value})
  }
  }
  
  
  const handleedit = async (e) => {
    e.preventDefault()
    const id=form._id
      try {
        setloading(true)
        const formdata=new FormData()
        Object.keys(form).forEach((key)=>{
          if(key==="images"){
            if(form.images instanceof File){
              formdata.append("images",form.images)
            }
          }else{
            formdata.append(key,form[key])
          }
        })
      const response=await api.put(`/product/update/${id}`,formdata)
      Loadproduct()
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
      
    }
  }
  
    

  const handledelete = async (id) => {
    try {

      const response = await api.delete(`/product/delete/${id}`      )
      Loadproduct()
      alert(response.data.message || "Deleted Successfully")
    } catch (error) {
      console.log(error.response?.data?.message || "Not deleted");

    }
  }

  return (

    <div className="max-w-8xl flex mx-auto bg-pink-50 p-6">
      {edit && (
      <div onClick={()=>setedit(false)}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div
        onClick={(e)=>{e.stopPropagation()}}
        className="relative w-[400px] p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
            <form
            onSubmit={handleedit}
            action="">
            <div className="flex flex-col gap-2">
              <label className="-mb-2 ml-1 text-white/70" htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                onChange={handlechange}
                value={form.name}
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20"
              />
              <label className="-mb-2 ml-1 text-white/70" htmlFor="">Price</label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handlechange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20"
              />
              <label className="-mb-2 ml-1 text-white/70" htmlFor="">Stock</label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handlechange}
                placeholder="Stock"
                className="w-full px-4 py-2 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20"
              />
              <label className="-mb-2 ml-1 text-white/70" htmlFor="">Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handlechange}
                placeholder="Product Description"
                className="w-full px-4 py-3 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20"
              />
              <label className="-mb-2 ml-1 text-white/70" htmlFor="">Discount</label>

              <input
                type="number"
                value={form.discountPercent}
                onChange={handlechange}
                name="discountPercent"
                placeholder="Discount %"
                className="w-full px-4 py-2 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20"
              />
                 <label className="-mb-2 ml-1 text-white/70" htmlFor="">Picture</label>
                  <input type="file" 
                  name="images"
                  onChange={handlechange}
                  className="w-full px-4 py-2 border rounded-xl text-white placeholder:text-white/50 outline-none 
        transition-all duration-300 focus:border-white/40  focus:bg-white/20 cursor-pointer"
                   id="" />
                  <button
                  className="w-full px-4 py-2 flex justify-center items-center gap-2 font-semibold bg-blue-600 rounded-xl text-white hover:bg-blue-500 outline-none"
                  >
                 {loading && (  <div  className="h-5 w-5 border rounded-full border-white border-t-transparent animate-spin"></div>)}
                 Updated</button>
            </div>
            </form>
        </div>
      </div>)}
      <div className="px-6 py-5 sticky top-0 h-screen">
        {admin === "admin" ?
          (<div className="flex flex-col -mt-7">
            <h1 className="font-bold text-xl">MISTRY</h1>
            <Link to="/admin/create-product"><button className="bg-blue-500 text-white px-9 py-2 cursor-pointer rounded-md font-semibold">Add Product</button></Link>
          </div>)

          : (<div> <h1 className="font-bold text-2xl">MISTRY</h1>
          </div>)}

        <div className="flex flex-col gap-4 mt-6">


          {admin === "admin" ? (<div></div>) : (

            <div className="border p-4 rounded">

              <h3 className="font-semibold mb-3">Categories</h3>
              {["Bags", "Clothing", "Electronics", "Clock", "Accessories"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 mb-2">

                  <input
                    type="checkbox"
                    value={cat}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategory([...category, cat])
                      } else {
                        setCategory(category.filter(c => c !== cat))
                      }
                    }}
                  />

                  {cat}

                </label>
              ))}
            </div>
          )}


          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="latest">Latest Products</option>
          </select>

        </div>

      </div>


      <div className="w-full ml-6">

        <div className="sticky top-0  z-10 pb-4">
          <input
            type="text"
            value={search}
            placeholder="Search products..."
            className="border w-full p-2 rounded bg-white shadow"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {products.map((product, idx) => (

            <div key={idx}>
              <Link
                to={`/product/${product._id}`}
              >
                <div className="hover:scale-105 bg-white transition-all duration-200 shadow-xl rounded-md p-2 backdrop-blur-2xl">

                  <div className="overflow-hidden"><img
                  className="rounded-md w-full h-70 object-cover hover:scale-120 transition-all duration-1000 "
                  src={ product.images }
                    alt={product.name} /></div>
                  <div className="px-5 py-2 font-semibold">
                    <h1 className=" text-lg font-bold">{product.name}</h1>
                    <div>
                      
      <span className="text-xl font-bold text-green-600">
            ₹{product.price - (product.price * product.discountPercent) / 100}</span>

          <span className="line-through ml-1 text-gray-500">₹{product.price}</span>
 
          <span className="bg-red-500 ml-1 text-white text-sm px-2 py-1 rounded">
            {product.discountPercent ? product.discountPercent : 0} % OFF
          </span>
                    </div>
                    <h3>{product.brand}</h3>
                     
                  <button className="w-full mt-2 bg-black text-white text-sm py-1.5 rounded-md hover:bg-gray-800 transition">
                    Add to Cart
                  </button>
                  </div>

                </div>  </Link>

              {admin === "admin" ?
                (<div className="flex mt-2 justify-between">
                  <button
                    onClick={() => {
                      setedit(true)
                      setform(product)
                    }}
                    className=" bg-transparent hover:scale-90 cursor-pointer transition-all duration-500 border px-5 py-2 rounded-md  font-semibold text-blue-500">Edit</button>
                  <button
                    onClick={() => handledelete(product._id)}
                    className="bg-transparent border hover:scale-90 cursor-pointer transition-all duration-500 px-5 py-2 rounded-md  font-semibold text-red-500">Delete</button>
                </div>) :
                (<div></div>)}
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Shop