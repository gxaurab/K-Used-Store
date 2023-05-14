import { useUIContext } from "../context/ui";
import { addLikedItemToFirestore } from "../components/search/firebase/db";
import getCurrentUserId from "../components/search/firebase/db";

function useLike(product){
  const {likedItems, setLikedItems} = useUIContext();

  const addToLikedItems = () => {
    const existingItemIndex = likedItems.findIndex(c => c.id === product.id);
    if (existingItemIndex >= 0) {
      setLikedItems(likedItems.filter(c => c.id !== product.id));
    } else {
      const newLikedItem = { ...product, liked: true };
      setLikedItems(c => [...c, newLikedItem]);
      addLikedItemToFirestore(getCurrentUserId(), newLikedItem); 
    }
  };

  const addToLikedItemsText = likedItems.findIndex(c => c.id === product.id) >= 0 
    ? "Remove from Liked Items"
    : "Add to Liked Items";
  
  return { addToLikedItems, addToLikedItemsText };
}

export default useLike;
