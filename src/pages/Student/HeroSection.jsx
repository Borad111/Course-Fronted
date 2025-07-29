import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
function HeroSection() {

  const navigate=useNavigate();
  const [serachQuery,SetSearchQuery]=useState("");
  const SearchQueryHandler=(e)=>{
    e.preventDefault();
    if(serachQuery.trim()!==''){
    navigate(`/course/search?query=${serachQuery}`);
    }
    SetSearchQuery("");
  }
  return (
    <div className=' bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-20 px-4 text-center'>
      <div className='max-w-3xl mt-3 mx-auto'>
        <h1 className='text-white text-4xl font-bold mb-4'>Find Best Course For You</h1>
        <p className='text-gray-200 dark:text-gray-400 mb-8'>Discover , Learn , and Upskill with our wide range of Course</p>
        <form onSubmit={SearchQueryHandler} className='flex bg-white dark:bg-gray-800 rounded-full overflow-hidden max-w-xl mx-auto'>
        
        <Input value={serachQuery} onChange={(e)=>SetSearchQuery(e.target.value)} className="flex-grow  focus-visible:ring-0  py-2 dark:bg-gray-800 dark:text-white placeholder-gray-900 dark:placeholder-white" type="text" placeholder="Search Courses" />
        <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
        </form>
        <Button onClick={()=>navigate(`/course/search?query`)} className="bg-white text-blue-700 border border-white hover:bg-blue-600 hover:text-white hover:border mt-5 hover:duration-500 dark:bg-gray-800 dark:text-white ">Explore Now</Button>
      </div>
    </div>
  )
}

export default HeroSection
