import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { removeFromDatabase, updateDatabaseRecord } from "../helpers/firebase";
import { Product } from "../interfaces";

function CMSEditor(model: {data: Product}){
    const [localCopy, setLocalCopy] = useState<Product>(React.useMemo(() => model.data, [model.data]));

    const buttonActivator = () => {
        if(localCopy.name && localCopy.id && localCopy.description && localCopy.preview){
            return false;
        } else return true;
    }

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
        // setLocalCopy({...localCopy, [args]: newValue});

        switch(args){
            case 'name': {
                if(newValue.length < 50){
                    setLocalCopy({...localCopy, [args]: newValue});
                }

                break;
            }
            case 'id': {
                const regex = /^[A-Za-z0-9-]*$|^$/;

                if(newValue.match(regex)){
                    setLocalCopy({...localCopy, [args]: newValue});
                }

                break;
            }
            case 'description': {
                if(newValue.length < 1000){
                    setLocalCopy({...localCopy, [args]: newValue});
                }

                break;
            }
            case 'preview': {
                const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                if(newValue.match(pattern)){
                    setLocalCopy({...localCopy, [args]: newValue});
                }

                break;
            }
        }
    }

    return(
    <>
        <Grid container direction="column" margin="20px">
            <TextField sx={{ margin: "10px"}} label="Назва" value={localCopy.name} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, "name")} required/>
            <TextField sx={{ margin: "10px" }}label="ID" value={localCopy.id} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'id')} required></TextField>
            <TextField sx={{ margin: "10px"}} label="Опис" value={localCopy.description} multiline rows={10} fullWidth inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'description')} required/>
                <Grid container>
                    <TextField sx={{ margin: "10px"}} label="Зображення" value={localCopy.preview} inputProps={{ readOnly: false }} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'preview')} />
                    <Box sx={{ margin: "10px"}} component='img' src={localCopy.preview}
                        maxHeight="20vmax"
                        borderRadius="25px"
                        />
                </Grid>
                <Button sx={{ margin: "10px"}} onClick={() => handleClicked(true)} disabled={buttonActivator()}>Опублікувати</Button>
                <Button onClick={() => handleClicked(false)} color="error">Видалити продукт з бази даних</Button>
        </Grid>
    </>
    )
}

export default CMSEditor;