'use client'
import React,{useState} from 'react'

import MuxPlayer from '@mux/mux-player-react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useConfettiStore } from '@/hooks/useConfettiStore'
import { Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


interface VideoPlayerProps{
    playbackId:string,
    courseId:string,
    chapterId:string,
    nextChapterId?:string,
    title:string,
    isLocked:boolean,
    completeOnEnd:boolean,
}



const VideoPlayer = ({playbackId,completeOnEnd,courseId,chapterId,nextChapterId,title,isLocked}:VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false)
    const router = useRouter()
    const confetti = useConfettiStore()

    const onEnd = async()=>{
        try {

            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                    isCompleted:true
                })

                if(!nextChapterId){
                    confetti.onOpen()
                }

                toast.success("Progress updated")
                router.refresh()

                if(nextChapterId){
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
            
        } catch (error) {
            toast.error("Something went wronf")
        }
    }


  return (
    <div className='relative aspect-video'>
        {!isReady && !isLocked&& (
            <div className='absolute inset-0 flex items-center justify-center bg-slate-800'>
                <Loader2 className='h-8 w-8 animate-spin text-secondary' />
            </div>
        )}
        {isLocked&& (
            <div className='absolute inset-0 flex flex-col gap-y-2 text-secondary items-center justify-center bg-slate-800'>
                <Lock className='h-8 w-8' />
                <p>This chapter is locked</p>
            </div>
        )}
        
            {!isLocked && (
                <MuxPlayer
                title={title}
                className={cn(!isReady&&"hidden")}
                onCanPlay={()=>{setIsReady(true)}}
                onEnded={onEnd}
                autoPlay
                playbackId={playbackId}
                />
            )}
    </div>
  )
}

export default VideoPlayer