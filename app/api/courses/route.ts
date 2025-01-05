import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const POST =async (req:Request) => {

    try {

        const {userId} =  auth()
        const {title} = await req.json();
        const isAuthorized = isTeacher(userId)
        if(!userId||!isAuthorized){
            return new NextResponse("UNAUTHORIZED",{status:401})
        }

        const course = await db.course.create({
            data:{
                userId,
                title,
                imageUrl:'null'
            }
        })

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSES] ",error)
        return new NextResponse("Internal Error",{status:500})
    }
}
