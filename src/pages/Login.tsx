import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Grid, TextField, Typography } from "@mui/material";

function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(auth);
    const onLogin = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }

    return(
        <>
            {
                auth.currentUser === null ?

                <Grid container direction="column" alignItems={"center"} justifyContent="center" height="100vh">
                    <Typography variant="h4" textAlign={"center"}>Адмін-доступ</Typography>
                    <TextField sx={{ margin: "10px" }} label={"E-mail"} type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField sx={{ margin: "10px" }} label={"Пароль"} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={onLogin}>Увійти</Button>
                </Grid>

                : navigate("/dashboard")
            }

        </>
    )
}

export default Login;