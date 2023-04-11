import { NextApiHandler } from "next";
import { hash } from "bcrypt";
import { prisma } from "@/lib/db";


interface SignUpInput {
    businessID?: string,
    name?: string,
    password?: string
}

const handler: NextApiHandler = async (req, res) => {
    try {
        const {businessID = '', name = '', password = ''} = req.body as SignUpInput

        if (!businessID || !name || !password) {
            return res.status(400).json({message: "Invalid request"})
        }

        if (!businessID.match(/^[A-Za-z0-9_.-]{3,16}$/g)) {
            return res.status(400).json({message: "Invalid business ID"})
        }

        const passwrodHash = await hash(password, 10)

        const user = await prisma.businessUser.create({
            data: {
                businessID: businessID,
                businessName: name,
                passwordHash: passwrodHash
            }
        })

        res.json({id: user.id})

    }
    catch(e) {
        console.error(e)
        res.status(500).json({message: "An error occurred"})
    }
}

export default handler