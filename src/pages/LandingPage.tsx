import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "../styles/LandingPage.css"
import bgimage from "/src/assets/images/shutterstock_503202520.jpg"

function LandingPage() {
    return(
            <Grid>
                <Box position={"absolute"} component="img" src={bgimage} zIndex="-1" width={"100%"} sx={{ objectFit: "cover"}} />
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid container direction="column" height="100%" marginTop={"5vmin"} alignContent={"center"}>
                        <Typography variant="h2" textTransform="uppercase" fontWeight="400" color="white" width="8em" bgcolor={"rgb(60, 179, 113)"} borderRadius={"20px"} textAlign="center">
                            SIA Mainspring
                        </Typography>
                        <Typography variant="body1" fontWeight={"400"} color="white" marginTop={"5px"} textAlign={"center"}>
                            Світло вашому урожаю і зростання вашому бізнесу
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
    );
}

export default LandingPage;