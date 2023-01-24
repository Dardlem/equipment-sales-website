import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import industrypic from "../assets/images/industry-img-isometric.jpg";
import "../styles/LandingPage.css"

function LandingPage() {
    return(
        <div id="perspective10">
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Box component="div" width="100%" height="100vh">
                        <Typography variant="h1" textTransform="uppercase" fontWeight="900" color="orange" width="7em" margin="10% 6%">
                            We're a global company
                        </Typography>
                    </Box>

                    <Grid container direction="row" justifyContent="space-around" sx={{ minHeight: "100vh", backgroundColor: "white" }} flex="true" >
                        <Box component="img" src={industrypic} sx={{ width: "40vw", height: "100%" }} alignSelf="center" />
                        <Typography variant="h2" textTransform="uppercase" fontWeight="600" color="black" width="9em" margin="0" textAlign="end" alignSelf="center">
                            We specialize on making our planet <Typography display="inline" variant="inherit" color="white" sx={{ borderRadius: "30px", backgroundColor: "green" }}>&nbsp;greener&nbsp;</Typography>
                        </Typography>
                    </Grid>
                </Grid>
        </div>
    );
}

export default LandingPage;