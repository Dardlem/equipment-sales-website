import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard"
import { Product, ProductArray } from "../interfaces"



function Products(model: {data: ProductArray<Product>}){
    console.log(model.data);

    if(model.data){
        return(
            <Grid
                width="80%"
                container
                direction="row"
                marginTop="10vmin"
                marginLeft="25vmin"
                marginRight="25vmin"
            >


                {
                    Object.keys(model.data).map((key: string) => {
                        return <ProductCard
                                key={key}
                                name = {model.data[key].name }
                                price = { model.data[key].price }
                                description = {model.data[key].description }
                                preview = { model.data[key].preview }
                                id={key}
                            />
                    })
                }

            </Grid>
        )
    }

    else
    return(
        <>
            <Box margin="10vmin">
                <Typography variant="h1">
                    Завантаження продуктів...
                </Typography>
            </Box>
        </>
    );
}

export default Products;