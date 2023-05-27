import React from 'react'
import { useRef } from 'react'
import {db, storage} from '../components/search/firebase/db'
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { Storage } from '../components/search/firebase/db';


export const AddProduct = () => {
    const name = useRef(null);
    const price = useRef(null);
    const description = useRef(null);
    const seller = useRef(null);
    let image_url = null;
    const handleSubmit = (e) => {
        if(name.current.value === "" || price.current.value === "" || description.current.value === "" || seller.current.value === ""){
            alert("Please fill all the fields");
            return;
        }
        if(image_url === null){
            alert("Please upload an image");
            return;
        }
        if(price.current.value < 0){
            alert("Price cannot be negative");
            return;
        }
        if(isNaN(price.current.value)){
            alert("Price must be a number");
            return;
        }
        if(seller.current.value === "admin"){
            alert("Seller cannot be admin");
            return;
        }
        
        e.preventDefault();
        const product = {
            name: name.current.value,
            price: price.current.value,
            description: description.current.value,
            seller: seller.current.value,
            image:image_url
        }
        addDoc(collection(db, "products"), product)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Product added successfully!");
            name.current.value = "";
            price.current.value = "";
            description.current.value = "";
            seller.current.value = "";
            image_url = null;
        }
        )
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("Failed to add product. Please try again.");
        }
        );
        
        

    }
    const handleImage = (e) => {
        if(seller.current.value === "admin"){
            alert("Seller cannot be admin");
            return;
        }
        e.preventDefault();
        const image = e.target.files[0];
        console.log(image);
        const imageRef = ref(storage, `images/${seller.current.value}+${name.current.value}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((url) => {
                image_url = url;
            })
          });
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" name="name" ref={name} />
    </label>
    <br />
    <label>
      Price:
      <input type="text" name="price" ref={price} />
    </label>
    <br />
    <label>
      Description:
      <textarea name="description" ref={description} />
    </label>
    <br />
    <label>
      Seller:
      <textarea name="seller" ref={seller}/>
    </label>
    <br />
    <label for="image">Select image:</label>
    <input type="file" id="image" name="image" accept="image/*" onChange={handleImage}/>
    <br />
    <button type="submit">Add Product</button>
  </form>
    </div>
  )
}

export default AddProduct
