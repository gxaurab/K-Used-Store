import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import service from "../../services";
import { db } from "../search/firebase/db";
import { getDocs,collection, doc } from 'firebase/firestore';


const pageSize=3;
export default function AppPagination({setProducts}){
    const [databaseProducts, setDatabaseProducts] = useState([]);
   
    const[pagination, setPagination]= useState({
        count: 0,
        from: 0,
        to: pageSize
    });
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
                setDatabaseProducts(filteredData)

                service.getData({from: pagination.from, to: pagination.to,products:databaseProducts}).then(response => {
                    console.log(response.count)
                    console.log(response.data)

                    setPagination({...pagination, count: response.count});
                    setProducts(response.data);
                    
                });
        
            }catch(e){
                console.log(e)
            }
        }

        getProductsFromDB()
        
        
        
    },[pagination.from , pagination.to]);

    const handlePageChange = (event, page) => {
        const from =(page -1)* pageSize;
        const to= (page -1)*pageSize + pageSize;

        setPagination({...pagination, from: from, to: to});
    }
    return (
        <Box 
            justifyContent={"center"}
            alignItems={"center"}
            display= "flex"
            sx={{margin : "20px 0px"}}
        >
            <Pagination 
                color="primary"
                count ={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
            />
        </Box>
    );
};