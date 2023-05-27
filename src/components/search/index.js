import { Button, IconButton, Slide, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../../styles/theme";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useUIContext } from "../../context/ui";
import  useDialogModal  from "../../hooks/useDialogModal";
import {useState} from 'react';

const SearchBoxContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: Colors.primary,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
  opacity: 0.9,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  ".MuiInputLabel-root": {
    color: Colors.secondary,
  },
    ".MuiInput-root": {
        fontSize: '1rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '2rem',
        },
    color: Colors.secondary,
  },
  ".MuiInput-root::before": {
    borderBottom: `1px solid ${Colors.secondary}`,
  },
  padding: "0 0 0 40px",
}));

export default function SearchBox(ProductDetail) {
  const [query,setQuery] = useState('');
  const [foundProduct,setFoundProduct] = useState({});

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] = useDialogModal(ProductDetail);
  const handleSearch = (e) => {
    const search_product = ProductDetail.ProductDetail;
    search_product.filter((product) => {
      if (product.name.trim() === query.trim()) {
        console.log(product.name);
        setFoundProduct(product);
        showProductDetailDialog();
      }
    });
    
    }
    const { showSearchBox, setShowSearchBox } = useUIContext();

  return (
    <Slide direction="down" in={showSearchBox} timeout={500}>
      <SearchBoxContainer>
        <SearchField
          color="secondary"
          variant="standard"
          fullWidth
          placeholder="search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton onClick={handleSearch}>
                  <SearchIcon  sx={{ fontSize: { xs: '2rem', md: "3rem" } }} color="secondary" />
        </IconButton>
              <IconButton
                  onClick={() => setShowSearchBox(false) }
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon sx={{ fontSize: "4rem" }} color="secondary" />
          {/* <ProductMeta product={foundProduct} />
        <ProductDetailDialog product={foundProduct} /> */}
        </IconButton>
      </SearchBoxContainer>

    </Slide>
  );
}