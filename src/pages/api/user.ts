import { prisma } from "@/lib/db";
import { withSessionApiRoute } from "@/lib/session";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const id = req.session.user_id

    try {
        const user = await prisma.businessUser.findUniqueOrThrow({
            where: {
                id: id
            },
            select: {
                id: true,
                businessID: true,
                businessName: true
            }
        })
        res.json({...user})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: "Server error"})
    }
}

export default withSessionApiRoute(handler)