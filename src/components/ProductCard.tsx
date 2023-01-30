import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { ProductCard } from "../interfaces";


function ProductCard(props: ProductCard){

    return(
        <Link to={`/products/${props.id}`}>
            <Card
                sx={{
                    width: '40vmin',
                    margin: '5vmin',
                    padding: '15px',

                }}
            >
                <Typography variant="h5">{props?.name}</Typography>
                <Box component='img' src={props?.preview}
                    maxHeight="20vmax"
                    maxWidth="20vmax"
                    borderRadius="25px"
                    />
            </Card>
        </Link>
    )
}

export default ProductCard;