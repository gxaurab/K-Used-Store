/*import { useUIContext } from "../context/ui";
import { addCartItemToFirestore } from "../components/search/firebase/db";
// import getCurrentUserId from "../components/search/firebase/db";
// import { database } from '../components/search/firebase';
import { set } from "firebase/database";

function useCart(product){
  const {cart, setCart} =useUIContext();

  const addToCart = async () => {
    // const cartIndex = cart.findIndex(c => c.id === product.id);
    // if (cartIndex >= 0) {
    //     const newCart = cart.filter(c => c.id !== product.id);
    //     setCart(newCart);
    //     await updateCartInFirebase(newCart); // update cart in Firebase
    // } else {
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     await updateCartInFirebase(newCart); // update cart in Firebase
    // }
  };


  const addToCartText = cart.findIndex(c => c.id === product.id) >= 0 
    ? "Remove from Cart"
    : "Add to Cart";

      // const updateCartInFirebase = async (newCart) => {
      // const userId = auth.currentUser.uid; // get the current user's ID
      // await set(ref(database, `carts/${userId}`), newCart); // set the cart data in Firebase
  
  
  return { addToCart, addToCartText };

}


export default useCart;*/

import { useUIContext } from "../context/ui";


function useCart(product){
    const {cart, setCart} =useUIContext();

    const addToCart =() => {
        cart.findIndex(c => c.id === product.id) >=0 
        ? setCart(cart.filter(c => c.id !==product.id))
        : setCart(c => [...c, product]);
    }

    const addToCartText = cart.findIndex ((c)=> c.id === product.id) >=0 
    ? "Remove from Cart" : "Add to Cart";

    let cart_items = JSON.parse(localStorage.getItem("cart_items"))? JSON.parse(localStorage.getItem("cart_items")): [];

    if(addToCartText === "Remove from Cart"){
      let count = 1;
      cart_items.forEach((item) => {
        if(item.id === product.id){
          count++;
          return;
        }
      });
      if(count === 1){
        cart_items.push(product);
      }
    }else{
        cart_items = cart_items.filter((item) => item.id !== product.id);
    }
    localStorage.setItem("cart_items", JSON.stringify(cart_items));

    return {addToCart, addToCartText}
}

export default useCart;
