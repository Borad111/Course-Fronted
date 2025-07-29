import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetPurchaseCourseQuery } from '@/features/api/purchaseApi';
import { Link } from 'react-router-dom';

function DashBoard() {  
  const {data, isError, isLoading} = useGetPurchaseCourseQuery();
  
  if(isLoading) return <p>Loading...</p>
  if(isError) return <p></p>

  const {PurchaseCourses} = data || [];
  const courseData = PurchaseCourses?.map((course)=>({
    name: course.courseId?.courseTitle,
    price: course.courseId?.coursePrice
  }))

  const TotalRevenue = PurchaseCourses.reduce((acc,element) => acc+(element?.amount), 0);
  const TotalSale = PurchaseCourses.length;

  return (
    <div className='md:ml-[16%] p-4'>
      {/* Mobile Navigation Buttons */}
      <div className="md:hidden flex gap-4 mb-6">
        <Link 
          to="/admin/dashboard" 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex-1 text-center"
        >
          Dashboard
        </Link>
        <Link 
          to="/admin/course" 
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex-1 text-center"
        >
          Course
        </Link>
      </div>

      {/* Stats Cards */}
      <div className='flex flex-col md:flex-row gap-4 mb-10'>
        <Card className="w-full md:w-60 dark:shadow-lg dark:shadow-white dark:rounded-lg">
          <CardHeader>
              <CardTitle className="font-bold text-xl">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold text-green-500'>{TotalSale}</p>
          </CardContent>
        </Card>

        <Card className="w-full md:w-60 dark:shadow-lg dark:shadow-white dark:rounded-lg">
          <CardHeader>
              <CardTitle className="font-bold text-xl">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold text-green-500'>{TotalRevenue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart - Hidden on Mobile */}
      <div className="hidden md:block">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
          <CardHeader>
            <CardTitle className="text-xl dark:text-white font-semibold text-gray-700">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="mb-12">
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    className='dark:text-white'
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value, name) => [`₹${value}`, name]} 
                    contentStyle={{
                      borderRadius: '8px',
                      padding: '10px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4a90e2"
                    strokeWidth={3}
                    dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashBoard