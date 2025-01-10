"use server"

import { prisma } from "../../lib/prisma"

export default async function changeStatus(id, status = 'CLOSED'){
    
    const updatedLog = await prisma.log.update({
        where: { id },
        data: { status },
      });
}