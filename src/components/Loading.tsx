import Image from 'next/image'
import React from 'react'
import CatLoading from "../assets/images/catLoading.gif"
function Loading() {
  return (
    <div className='fixed top-0 left-0 bg-black/70 w-full h-screen z-[1000] flex items-center justify-center'>
      <Image src={CatLoading} width={200} height={200} alt='Cat loading'/>
    </div>
  )
}

export default Loading