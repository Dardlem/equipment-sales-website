import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import  fetchData from "../helpers/fetch";
import ProductCard from "../components/ProductCard"
import { ProductList } from "../interfaces"



function Products(){
    const [data, setData] = useState<ProductList>({
        products: [],
    });

    useEffect(() => {
        setData(fetchData());
    }, []);

    if(data){
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
                    data.products.map((product) => {
                        return <ProductCard
                                key={product.id}
                                name = {product.name }
                                price = { product.price }
                                description = {product.description }
                                preview = { product.preview }
                                id = { product.id }
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
                    Loading products...
                </Typography>
            </Box>
        </>
    );
}

export default Products;