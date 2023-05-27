//import products from "../components/products";

import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../components/search/firebase/db";
const getProductsFromDB = async () => {
    const productsCollectionRef = collection(db, "products");
    const data = await getDocs(productsCollectionRef)
    const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
    }))
    return filteredData;
}

const service ={
    getData: async ({from, to, products}) => {
        products = await getProductsFromDB();
        return new Promise((resolve, reject) => {
            const data = products.slice(from, to);
            resolve({
                count: products.length,
                data : data
            })
           

        });
    }
}

export default service;