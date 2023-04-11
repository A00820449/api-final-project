import { prisma } from "@/lib/db";
import { withSessionApiRoute } from "@/lib/session";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const id = req.session.user_id

    try {
        const user = await getUserData(id)
        res.json({...user})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: "Server error"})
    }
}

export async function getUserData(id: string) : Promise<User | null> {
    return await prisma.businessUser.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            businessID: true,
            businessName: true,
            isAdmin: true
        }
    })
}

export type User = {
    id: string,
    businessID: string,
    businessName: string,
    isAdmin: boolean
}
export default withSessionApiRoute(handler)