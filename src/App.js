import { useEffect,useState } from 'react';
import './App.css';
import Data from './Data'
import React from 'react';
import { Slide,Dialog, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';

function App() {
  const [item,setItem]=useState(Data);
  const [keyword,setKeyword] = useState("");
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleOnChange = (e)=>{
    setKeyword(e.target.value);
  }
  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.id === product.id
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);

    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
    }

  }
  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  },[cart])
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="searchbar">
      <input type="text" placeholder='search items' value={keyword} onChange={handleOnChange}/>
      <button className='searchbtn' onClick={(e)=>setKeyword("")}>clear</button>
      </div>
      <Button variant='contained' onClick={handleClickOpen}>Show</Button>
      <h2>No of items: {item.length}</h2>
      <div className="heading">
        <span className="1">Product</span>
        <span className="2">Quantity</span>
        <span className="3">Price</span>
        <span className="3">Add</span>
      </div>
      <div className="main">
      {item.filter((items)=>{
        if(keyword === ""){
          return items
        }
        else if (items.name.toLowerCase().includes(keyword.toLowerCase())){
          return items
        }
      }).map((items,key)=>{
        const {name,id,quantity,price}=items;
        return (
            <div className="container" key={id}>
               <span className="Name">{name}</span>
               <span className="quantity">{quantity}</span>
               <span className="price">₹{price}</span>
               <Button variant='contained' color="warning"  onClick={() => addProductToCart(items)}>+</Button>
            </div>
        )
    })}</div>
    <Dialog 
    fullScreen        
     open={open}        
      onClose={handleClose}         
      >
     <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        {/* <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button> */}
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount in Rs: {totalAmount}</h2>
              </div>
              <Divider />
              <div>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
<Button variant="contained" color="error" onClick={()=>setCart([])}>Clear All</Button>
</Box>
              </div>
      </Dialog>
    </div>
  );
}

export default App;
