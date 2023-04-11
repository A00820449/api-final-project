import { getUserProp, withSessionSsr } from "@/lib/session";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { User, getUserData } from "./api/user";
import { FormEventHandler } from "react";

export const getServerSideProps = getUserProp

const Login = () => {

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const username = data.get("username")?.toString()
        const password = data.get("password")?.toString()


    }

    return (
        <Container>
            <Typography variant="h3">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="username" placeholder="Business ID"/>
                <TextField name="password" placeholder="Password" type="password"/>
                <Button variant="contained">Log In</Button>
            </form>
        </Container>
    )
}

export default Login