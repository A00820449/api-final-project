import { NextApiHandler } from "next";
import { withSessionApiRoute } from "@/lib/session";
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";

export async function LoginInputQuery(username: string, password: string) {
    const user = await prisma.businessUser.findUnique({
        where: {
            businessID: username
        }
    })

    if (!user) {
        return null
    }

    if (await compare(password, user.passwordHash)) {
        return user.id
    }

    return null
}

interface LoginInput {
    username?: string,
    password?: string
}

const handler: NextApiHandler = async (req, res) => {
    const {username, password} = req.body as LoginInput

    if (!username || !password) {
        return res.status(400).json({message: "Invalid request"})
    }

    try {
        const user_id = await LoginInputQuery(username, password)

        if (user_id) {
            return res.json({id: user_id})
        }

        return res.status(400).json({message: "Wrong username or password"})
    }
    catch (e) {
        console.error(e)
        res.status(500).send({message: "Server error"})
    }
}

export default withSessionApiRoute(handler)