import { useState } from "react";
import { firebasedb } from "../search/firebase/db";
import { Button } from "@mui/material";



function AddProductButton() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebasedb.addProduct(product);
      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        seller: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function openForm() {
  return(
    <></>
  )
  
}
  return (
    
    <Button variant="contained" onClick={openForm()}> Add product</Button>
    
);
    
  }





export default AddProductButton;
