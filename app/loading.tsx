'use client'
import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../public/loading.json'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className='flex justify-center items-center h-[100vh]'  >
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    )
}

export default Loading