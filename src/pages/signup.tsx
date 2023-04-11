import { withSessionSsr } from "@/lib/session";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

export const getServerSideProps = withSessionSsr(async ({req})=>{

    if (req.session.user_id) {
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard"
            }
        }
    }

    return {
        props: {}
    }
})


const SignUp = () => {

    const [message, setMessage] = useState("")
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
    }

    return (
        <Container maxWidth="xs">
            {message && <Alert severity="error">{message}</Alert>}
            <Typography variant="h4" sx={{margin: "1rem 0"}}>Create an account</Typography>
            <form onSubmit={handleSubmit}>
                <TextField sx={{marginBottom: "1rem"}} fullWidth name="username" placeholder="Business ID (will be used in your URL)"/>
                <TextField sx={{marginBottom: "1rem"}} fullWidth name="name" placeholder="Business Name"/>
                <TextField sx={{marginBottom: "1rem"}} fullWidth name="password" placeholder="Password" type="password"/>
                <TextField sx={{marginBottom: "1rem"}} fullWidth name="password2" placeholder="Confirm Password" type="password"/>
                <Button sx={{marginBottom: "1rem"}} type="submit" disabled={uploading} fullWidth variant="contained">Register Account</Button>
            </form>
            <Box>
                Already have ana account? <Link href={'/login'}>Log In</Link>
            </Box>
        </Container>
    )
}

export default SignUp