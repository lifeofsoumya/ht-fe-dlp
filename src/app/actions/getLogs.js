"use server"

import { prisma } from "../../lib/prisma"

export async function getLogsForAdmin(){
    const logs = await prisma.log.findMany();
    return logs;
}