import { withSessionSsr } from "@/lib/session";
import { Container } from "@mui/material";
import { User, getUserData } from "./api/user";

export const getServerSideProps = withSessionSsr(async ({req})=>{

    if (!req.session.user_id) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const user = await getUserData(req.session.user_id)
    
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    return {
        props: {
            user: user
        }
    }
})

const Dashboard = ({user}: {user: User | null}) => {
    return (
        <Container>
            Hello, {user?.businessName}
        </Container>
    )
}

export default Dashboard