import React from 'react';
import CourseSkeleton from './CourseSkeleton';
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';

function MyLearing() {
    const { data, isLoading } = useLoadUserQuery();
    const mylearning = data?.user?.enrollCourses;

    return (
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
    <h1 className='font-bold text-2xl px-4 sm:px-0'>My Learning</h1>
    <div className='py-6'>
        {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <CourseSkeleton key={index} />
                ))}
            </div>
        ) : !mylearning || mylearning.length === 0 ? (
            <p className='px-4 sm:px-0'>You Are Not Enrolled in Any Course</p>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0'>
                {mylearning.map((course, index) => (
                    <Course key={index} index={index} course={course} />
                ))}
            </div>
        )}
    </div>
</div>
    );
}

export default MyLearing;
