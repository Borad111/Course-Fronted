import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Sidebar() {
  return (
    <>
    <div className='hidden ml-3  font-semibold text-xl  mt-24 md:block w-[250px]  md:w-[250px] space-y-8 border-r border-r-gray-400  dark:border-r-gray-700 fixed top-0 h-screen'>
      <div className='space-y-4 '>
      <Link to="/admin/dashboard"  className='flex gap-3 my-2 p-4 hover:shadow-lg  transition-all duration-400'>
        <ChartNoAxesColumn size={30}/>
        <h1>DashBoard</h1>
      </Link>
      <Link to="/admin/course" className='flex gap-3 my-2 p-4 hover:shadow-lg transition-all duration-400 '>
        <SquareLibrary size={30}/>
        <h1>Course</h1>
      </Link>
      </div>
    </div>
    <div className='mt-32 md:ml-10 '>
      <Outlet/>
      </div>
    </>
  )
}

export default Sidebar
