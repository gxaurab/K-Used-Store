import { Avatar, Button, Divider, Drawer, Paper, Typography, useMediaQuery } from "@mui/material";
import { Colors } from '../../styles/theme';
import { useUIContext } from "../../context/ui";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import IncDec from "../ui/incdec";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function LikeButton({ item }) {
  const { setShowCart, showCart } = useUIContext();
  const [isLiked, setIsLiked] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const likedItemsRef = collection(db, "users", user.uid, "likedItems");
      const itemRef = doc(likedItemsRef, item.id);

      getDoc(itemRef).then((docSnap) => {
        if (docSnap.exists()) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
    }
  }, [item.id]);

  const handleLike = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("not logged in");
    } else {
      const likedItemsRef = collection(db, "users", user.uid, "likedItems");
      const itemRef = doc(likedItemsRef, item.id);

      if (!isLiked) {
        await setDoc(itemRef, {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
        });
        setIsLiked(true);
      } else {
        await itemRef.delete();
        setIsLiked(false);
      }
    }
  };

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          background: Colors.light_gray,
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{ p: 4 }}
        display="flex"
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h3" color={Colors.black}>
          {isLiked ? "Remove from Liked" : "Add to Liked Items"}
        </Typography>
        <Avatar src={item.image} sx={{ width: 96, height: 96, mt: 4, mb: 2 }} />
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Rs.{item.price}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2, textAlign: "center" }}>
          {item.description}
        </Typography>
        <IncDec />
        <Divider variant="inset" />
        <Button sx={{ mt: 4 }} variant="contained" onClick={handleLike}>
          {isLiked ? "Remove from Liked" : "Add to Liked Items"}
        </Button>
      </Box>
    </Drawer>
  );
}
