import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../helpers/firebase";

function AdminDashboard() {
    const navigate = useNavigate();
    if(!auth.currentUser)
    {
        return(
            <>
                <Typography textAlign={"center"}>Заборонено</Typography>
                {navigate("/login")}
            </>
        )
    }

    return(
        <Grid marginTop={"200px"}>
            <Typography textAlign={"center"}>Панель адміністратора</Typography>
            <Grid container justifyContent={"center"} alignContent={"center"}>
                <Button>
                    <Link to="/cms">CMS</Link>
                </Button>
                <Button>
                    <Link to="/orders">Замовлення</Link>
                </Button>
            </Grid>
        </Grid>
    )


}

export default AdminDashboard;