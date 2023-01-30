import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../helpers/firebase";

function AdminDashboard() {
    const navigate = useNavigate();
    if(!auth.currentUser)
    {
        return(
            <>
                <Typography textAlign={"center"}>FORBIDDEN</Typography>
                {navigate("/login")}
            </>
        )
    }

    return(
        <Grid marginTop={"200px"}>
            <Typography textAlign={"center"}>Admin dashboard</Typography>
            <Grid container justifyContent={"center"} alignContent={"center"}>
                <Button>
                    <Link to="/CMS">CMS</Link>
                </Button>
                <Button>
                    <Link to="/orders">Orders</Link>
                </Button>
            </Grid>
        </Grid>
    )


}

export default AdminDashboard;