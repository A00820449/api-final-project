import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";

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
        const user = await prisma.businessUser.findUnique({
            where: {
                businessID: username
            }
        })

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        if (await compare(password, user.passwordHash)) {
            req.session.user_id = user.id
            await req.session.save()
            return res.json({id: user.id})
        }
        else {
            res.status(400).send({message: "Wrong password"})
        }
    }
    catch (e) {
        
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)