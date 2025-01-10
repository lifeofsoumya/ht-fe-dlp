const { PrismaClient } = require("@prisma/client");

let prisma; // init with null

if(process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient();
} else {
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export { prisma };