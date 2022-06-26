import { useState } from 'react';
import './App.css';
import Data from './Data'

function App() {
  const [item,setItem]=useState(Data);
  const [keyword,setKeyword] = useState("");
  const handleOnChange = (e)=>{
    setKeyword(e.target.value);
  }
  return (
    <div className="App">
      <div className="searchbar">
      <input type="text" placeholder='search items' onChange={handleOnChange}/>
      <button className='searchbtn'>Search</button>
      </div>
      <h2>No of items: {item.length}</h2>
      <div className="heading">
        <span className="1">Product</span>
        <span className="2">Quantity</span>
        <span className="3">Price</span>
      </div>
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
            </div>
        )
    })}
    </div>
  );
}

export default App;
