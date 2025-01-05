import { db } from "@/lib/db";

import React from 'react'

const getProgress = async(userId:string,courseId:string):Promise<number> => {

    try {
        
        const publishedChapters = await db.chapter.findMany({
            where:{
                courseId:courseId,
                isPublished:true
            },
            select:{
                id:true
            }
        })

        const publishedChapterIds = publishedChapters.map((ch)=>ch.id)

        const validCompletedChapters = await db.userProgress.count({
            where:{
                userId,
                chapterId:{
                    in:publishedChapterIds
                },
                isCompleted:true
            },
        })

        const progressPercentage = (validCompletedChapters/publishedChapterIds.length)*100

        return progressPercentage

    } catch (error) {
        console.log("GET_PROGRESS",error)
        return 0;
    }
 
}

export { getProgress}