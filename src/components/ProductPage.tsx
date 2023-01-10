import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Product } from "../interfaces";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useShoppingCart } from "../context/ShoppingCartContext";


function ProductPage(model: {product: Product}) {
    const { increaseItemQuantity } = useShoppingCart();

    return(
        <Grid
            container
            direction="column"
            width="90%"
            margin="10vmin"
        >
            <Typography variant="h2">
                {model.product.name}
            </Typography>
            <Grid container direction="column" width="50%">
                <Typography variant="body1" marginTop="2%" marginBottom="2%">
                    {model.product.description}
                </Typography>
            </Grid>
            <Grid container direction="column" width="20%">
                <Box
                    component="img"
                    src={model.product.preview}
                    maxHeight="30vmax"
                    maxWidth="30vmax"
                    borderRadius="25px"
                />
                <Button onClick={ () => {increaseItemQuantity(model.product.id)} }
                    sx={{
                        width: "auto",
                        height: "auto"
                    }}
                >
                    <Typography variant="body1" marginRight="5px" textTransform="uppercase">
                        Add to quote
                    </Typography>
                    <ShoppingCartIcon />
                </Button>
            </Grid>
        </Grid>
    )
}

export default ProductPage;