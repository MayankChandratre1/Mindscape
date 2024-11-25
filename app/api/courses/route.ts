import { redis } from "@/redis"

export const GET = async (req: Request) => {
    return Response.json({
        message:await redis.get('xyz')
    })
}

export const POST = (req: Request) => {
    return Response.json({
        message:"Created Redis"
    })
}