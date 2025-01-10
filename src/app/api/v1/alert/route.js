import { NextResponse } from "next/server";
import { authOptions, getAuthSession} from "@/lib/auth"
import { getServerSession } from "next-auth/next";
import { getUser } from "@/app/actions/getUser"

export async function GET(request, response){
    const user = await getUser();
    return NextResponse.json({ message: 'working', user: user.id })
}

export async function POST(request){
    const { sensitive, system_id } = await request.json();
    
    try {
        for(let i = 0; i < sensitive.length; i++){
            const { type, score } = sensitive[i];
            const log = await prisma.log.create({
                data: {
                    eventType: String(type),
                    score: String(score), 
                    systemId: String(system_id),
                }
            })
        }
    } catch (error) {
        console.error('error while creating logs', error.message)
    }
   
    return NextResponse.json({ message: ' params received'}, { status: 201 })
}