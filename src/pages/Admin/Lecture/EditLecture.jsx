import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab';

function EditLecture() {
    const {courseId}=useParams();
  return (
    <div className='p-4 md:ml-[250px] mt-10 md:mt-0 flex-1'> {/* Added padding and dynamic margin */}
  <div className='flex flex-col sm:flex-row items-center justify-between mb-5'> {/* Changed to column on mobile, row on sm+ */}
    <Link to={`/admin/course/${courseId}/lecture`} className="mb-4 sm:mb-0"> {/* Added margin-bottom on mobile */}
      <Button size='icon' variant='outline' className="hover:text-white border border-black hover:bg-black w-full sm:w-auto"> {/* Full width on mobile, auto on sm+ */}
          <ArrowLeft/>
      </Button>
    </Link>
    {/* Removed pl-32 and text-center for better responsiveness */}
    <h1 className='font-bold text-xl sm:text-2xl text-center sm:text-left flex-1'>Update Your Lecture</h1> 
  </div>
  <LectureTab/>
</div>
  )
}

export default EditLecture
