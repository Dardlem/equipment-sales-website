import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { removeFromDatabase, updateDatabaseRecord } from "../helpers/firebase";
import { Product } from "../interfaces";

function CMSEditor(model: {data: Product}){
    const [localCopy, setLocalCopy] = useState<Product>(React.useMemo(() => model.data, [model.data]));

    useEffect(() => {
        setLocalCopy(model.data);
    }, [model.data])

    const handleClicked = (action: boolean) => {
        if(action){
            if(localCopy.name && localCopy.id && localCopy.description && localCopy.preview){
                updateDatabaseRecord(`products/${localCopy.id}`, localCopy);
            }
        }
        else{
            removeFromDatabase(`products/${localCopy.id}`);
        }

        window.location.reload();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, args?: any) => {
    console.log(event.target.name);
        const newValue: typeof event.target.value = event.target.value;
        setLocalCopy({...localCopy, [args]: newValue});
    }

    return(
    <>
        <Grid container direction="column" margin="20px">
            <TextField sx={{ margin: "10px"}} label="Name" value={localCopy.name} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, "name")} required/>
            <TextField sx={{ margin: "10px" }}label="ID" value={localCopy.id} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'id')} required></TextField>
            <TextField sx={{ margin: "10px"}} label="Description" value={localCopy.description} multiline rows={10} fullWidth inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'description')} required/>
                <Grid container>
                    <TextField sx={{ margin: "10px"}} label="Preview img" value={localCopy.preview} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'preview')} />
                    <Box sx={{ margin: "10px"}} component='img' src={localCopy.preview}
                        maxHeight="20vmax"
                        borderRadius="25px"
                        />
                </Grid>
                <Button sx={{ margin: "10px"}} onClick={() => handleClicked(true)}>Publish</Button>
                <Button onClick={() => handleClicked(false)} color="error">Remove this product from database</Button>
        </Grid>
    </>
    )
}

export default CMSEditor;