"use server"

import { getAuthSession } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function getUser() {
    const session = await getAuthSession();

    try {
        if(!session || !session.user.email) {
            return null;
        }
    
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
    
        if(!currentUser){
            return null;
        }
    
        return currentUser;
    } catch (error) {
        console.error(error.message);
        return null
    }
}