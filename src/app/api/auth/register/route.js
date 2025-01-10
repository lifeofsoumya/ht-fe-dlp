import { hash } from "keyhasher";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";


export async function POST(request){
    const body = await request.json();
    const { name, email, password, systemid } = body;

    console.log('inside user creation file')

    if(!name.trim() || !email.trim() || !password.trim() || !systemid.trim()) {
        return NextResponse.json({ message: "fields are empty"}, { status: 400 })
    }

    const hashedPW = hash(password);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: hashedPW,
                // userSystemId: systemid
            }
        })
        console.log(user, ' user created')
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: error.message }, { status: 500})
    }
}