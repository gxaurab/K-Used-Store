import React, { useState } from 'react'
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Appbar from "../components/appbar";
import { ThemeProvider } from "@mui/system";
import theme from "../styles/theme";
import Banner from "../components/banner";
import Products from "../components/products";
import { UIProvider } from "../context/ui";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";
import Promotions from "../components/promotions";
import SearchBox from "../components/search";
import { useEffect } from "react";
import Cart from "../components/cart";
import UserProvider from "../context/ui/User";
import {db} from '../components/search/firebase/db'
import { getDocs,collection, doc } from 'firebase/firestore';
import {AddProdcut} from './addProduct'
import { Link } from 'react-router-dom';

export const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsFromDB = async () => {
            const productsCollectionRef = collection(db,'products')
            try{
                const data = await getDocs(productsCollectionRef)
                const filteredData = data.docs.map((doc)=>({
                    ...doc.data(),
                    id:doc.id
                }));
                console.log(filteredData)
                setProducts(filteredData)
            }catch(e){
                console.log(e)
            }
        }
        getProductsFromDB()
        document.title = "K-Used Store - Home";
        
      }, []);

  return (
    <>
       <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        <Stack>
          <UIProvider>
            <UserProvider>
            <Appbar />
            <Banner />
            <Promotions />
            <SearchBox  ProductDetail={products}/>
            <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h4">Our Products</Typography>
            </Box>
            <Products />
            <Link to="/add" style={{display:'flex',justifyContent:'center',textDecoration:'none'}}>
            <Button variant="contained" color="secondary" sx={{ m: 2 }}>
              Add Product
            </Button>
            </Link>

            <Footer />
            <AppDrawer />
            <Cart />
            </UserProvider>
          </UIProvider>
        </Stack>
      </Container>
    </ThemeProvider>
    </>
  )
}

