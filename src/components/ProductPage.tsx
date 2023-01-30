import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Product } from "../interfaces";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useShoppingCart } from "../context/ShoppingCartContext";


function ProductPage(model: {product: Product}) {
    const { addToCart } = useShoppingCart();

    return(
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            margin={"100px"}
        >
            <Typography variant="h2">
                {model.product.name}
            </Typography>
            <Grid container direction={"row"} alignItems="center" justifyContent="center">
                <Grid width={"50%"}>
                    <Typography variant="body1">
                        {model.product.description}
                    </Typography>
                </Grid>
                <Grid container direction="column" width="50%" alignContent={"center"}>
                    <Box
                        component="img"
                        src={model.product.preview}
                        maxHeight="30vmax"
                        maxWidth="30vmax"
                        borderRadius="25px"
                    />
                    <Button onClick={ () => {addToCart(model.product.id)} }
                        sx={{
                            width: "auto",
                            height: "auto"
                        }}
                    >
                        <Typography variant="body1" marginRight="5px" textTransform="uppercase">
                            Додати до замовлення
                        </Typography>
                        <ShoppingCartIcon />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductPage;