import { Box, Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CMSEditor from "../components/CMSEditor";
import { auth } from "../helpers/firebase";
import { Product, ProductArray } from "../interfaces";

function CMS(model: {data: ProductArray<Product>}) {
    const [editorData, setEditorData] = useState<Product>(null as unknown as Product);

    useEffect(() => {
        if(auth.currentUser === null){
            navigate('/login');
        }
    }, [])

    let navigate = useNavigate();

    const editor = useMemo(() => <CMSEditor data={editorData as Product} />, [editorData]);

    const handleClicked = (key: string) => {
        setEditorData(model.data[key]);
    }

    const handleNewProduct = () => {
        let newProduct: Product = {
            name: "",
            description: "",
            price: 0,
            preview: "",
            id: "",
        }

        setEditorData(newProduct);
        console.log(editorData);
    }

    if(auth.currentUser === null){
        return(
            <>
                <Typography textAlign={"center"}>FORBIDDEN</Typography>
            </>
            );
    }

    return(
        <Grid marginTop="10vmin">
            <Box>
                <Typography variant="h1">CMS</Typography>
            </Box>
            <Grid container direction="row" width="100%" flexWrap="nowrap">
                <Box>
                    <List>
                    <Button onClick={handleNewProduct}>
                        <ListItem key="add-item">
                            <Typography>Add product</Typography>
                        </ListItem>
                    </Button>
                    <Divider />
                    <Grid container direction="column" width="100%">
                        {Object.keys(model.data).map((key: string) =>{
                            return(
                                <Button key={key} onClick={() => handleClicked(key)}>
                                    <ListItem>
                                        <Typography>{model.data[key].name}</Typography>
                                    </ListItem>
                                </Button>
                            )
                        })}
                    </Grid>
                    </List>
                </Box>
                { editorData !== null ? editor : null}
            </Grid>
        </Grid>
    )
}

export default CMS;