import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CourseTab from '@/pages/Admin/Course/CourseTab';

function EditCourse() {
    const navigate=useNavigate();
  return (
<div className='p-4 md:ml-[250px] mt-10 md:mt-0 flex-1'> {/* Adjusted padding and margin */}
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5'> {/* Changed to column on mobile */}
        <h1 className='font-semibold text-xl sm:text-2xl mb-3 sm:mb-0'> {/* Added bottom margin on mobile */}
        Add Details Information Regarding Course .
        </h1>
        <Button onClick={()=>navigate("lecture")} className="mr-0 sm:mr-6 w-full sm:w-auto">Go to Lecture</Button> {/* Full width button on mobile */}
    </div>
    <div>
        <CourseTab/>
    </div>
</div>
  )
}

export default EditCourse
