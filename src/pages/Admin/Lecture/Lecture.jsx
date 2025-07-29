import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, index, courseId }) {
    const navigate=useNavigate();

    const goToUpdatePage=()=>{
        navigate(`${lecture._id}`)
    }
  return (
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#F7F9FA] my-1 dark:bg-[#1F1F1F] py-2 px-4">
  {/* Lecture Title Section */}
  <div className="flex items-center mb-2 sm:mb-0"> {/* Added margin-bottom for spacing on small screens */}
    <span className="dark:text-white">Lecture - {index + 1} :</span>
    <h1 className="font-bold ml-3 dark:text-white ">{lecture.lectureTitle}</h1>
  </div>
  
  {/* Edit Button Section */}
  <div className="w-full sm:w-auto"> {/* Ensures button takes full width on mobile if needed */}
    <Button onClick={goToUpdatePage} className="cursor-pointer w-full sm:w-auto hover:text-black hover:bg-white hover:border hover:border-black hover:transition-all hover:duration-300 ">
      <Edit size={20} />
    </Button>
  </div>
</div>
  );
}

export default Lecture;
