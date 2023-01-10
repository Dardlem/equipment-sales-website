import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { ProductCard } from "../interfaces";


function ProductCard(props?: ProductCard){

    return(
        <Link to={`/Products/${props?.id}`}>
            <Card
                sx={{
                    minWidth: '40vmin',
                    maxWidth: '60vmax',
                    margin: '5vmin',
                    padding: '15px',
                }}
            >
                <Typography variant="h5">{props?.name}</Typography>
                <Typography>{props?.price}</Typography>
                {/* <Typography>{truncate(props?.description)}</Typography> */}
                <Box component='img' src={props?.preview}
                    maxHeight="20vmax"
                    borderRadius="25px"
                    />
            </Card>
        </Link>
    )
}

function truncate(s: string = ""): string {
    const length = 40;
    return s.length > length ? s.substring(0, length-3) + "..." : s;
}

export default ProductCard;