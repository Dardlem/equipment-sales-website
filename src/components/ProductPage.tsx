import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Product } from "../interfaces";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"


function ProductPage(model: {product: Product}) {


    return(
        <Grid
            container
            direction="row"
            width="100%"
            margin="10vmin"

            justifyContent="flex-start"
        >
            <Typography variant="h2">
                PRODUCT PAGE for {model.product.name}
            </Typography>
            <Typography variant="body1">
                {model.product.description}
            </Typography>
            <Box
                component="img"
                src={model.product.preview}
            />
            <IconButton>
                <ShoppingCartIcon />
            </IconButton>
        </Grid>
    )
}

export default ProductPage;