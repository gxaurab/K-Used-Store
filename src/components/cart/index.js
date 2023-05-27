import { Avatar, Button, Divider, Drawer, Paper, Typography, useMediaQuery } from "@mui/material";
import { Colors } from '../../styles/theme';
import { useUIContext } from "../../context/ui";
import { useTheme } from "@mui/material/styles";
import {Box} from "@mui/system";
import IncDec from "../ui/incdec";
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function Cart(){
    const {cart, setShowCart, showCart } = useUIContext();
    const theme = useTheme();
    const matches= useMediaQuery(theme.breakpoints.down('md'));

    const cartContent = cart.map(item => (
        <Box key={item.id}>
            <Box
                display='flex'
                sx= {{pt : 2, pb: 2}}
                alignItems= "start"
                justifyContent={"space-between"} >
                    <Avatar src ={item.image} sx={{width: 96, height : 96, mr : 2}} />
                    <Box display='flex' flexDirection={"column"}>
                        <Typography variant= "h6">{item.name}</Typography>
                        {!matches &&<Typography variant="subtitle2">{item.description}</Typography>}
                    </Box>
                    <Typography variant= "body1" justifyContent={"end"}>
                        Rs.{item.price}
                    </Typography>
            </ Box>
                {matches && <Typography variant="subtitle2">{item.description}</Typography>}
            
            <Box
                sx={{ mt: 4 }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <IncDec />
              </Box>

              <Divider variant="inset" />
        </ Box>
        
    ));

    const handleCheckout = async() =>{
        const auth = getAuth();
        const user = auth.currentUser;
        if(!user){
            alert("not logged in")
        }else{

            const cart = JSON.parse(window.localStorage.getItem("cart_items"));
            const sellers = [...new Set(cart.map(item => item.seller))];
            alert(sellers);
           
        }
    }

    return (
        <Drawer
        open={showCart}
        onClose={() => setShowCart(false)}
        anchor="right"
        PaperProps={{
            sx: {
                width: matches ? '100%' : 500,
                background: Colors.light_gray,
                borderRadius: 0 
            }
        }}
        >
            {cart.length > 0 ? <Box 
                sx={{p: 4}}
                display="flex"
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                >
                    <Typography variant="h3" color={Colors.black}>
                        Your Cart
                    </Typography>
                    <Typography variant="body1" color={Colors.muted}>
                    {" "}
                    Items
                    </Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 2,
                            width: '90%',
                            padding: 4,
                        }}
                    >
                        {cartContent}
                    </Paper>
                    <Button sx={{mt: 4}} variant="contained" onClick={handleCheckout}>
                        Proceed to Payment
                    </Button>
                </Box> : <Box
                            sx={{p: 4}}
                            display={"flex"}
                            justifyContent={"center"}
                            flexDirection={"column"}
                            alignItems={"center"}
                        >
                    <Typography variant={matches ? "h5" : "h3"} color={Colors.black}>
                        Your Cart is empty!!
                    </Typography>
                </Box> }

                <Button onClick={() => setShowCart(false)}>Close</Button>
            
        </Drawer>
    );
}
