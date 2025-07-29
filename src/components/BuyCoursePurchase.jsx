import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useQueryCheckOutSessionMutation } from "@/features/api/purchaseApi";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function BuyCoursePurchase({ courseId }) {
  const [queryCheckOutSession, { isError, isLoading, isSuccess, data }] =
    useQueryCheckOutSessionMutation();

  const purchaseCourseHandler = async () => {
    await queryCheckOutSession(courseId);
  };

  useEffect(()=>{
    if(data && isSuccess){
      toast.success(data.message || "success");
      if(data?.url){
        window.location.href = data?.url;
      }
    }
    if(isError){
      toast.error(isError.data?.message || "Error");
    }
  },[isSuccess,data,isError])
  return (

    <div>
      <Button className="bg-green-700 text-white border hover:border-black transition-all hover:scale-105 hover:duration-300  hover:bg-green-600" disabled={isLoading} onClick={purchaseCourseHandler}> 
      {
        isLoading ? (
          <>
          <Loader2 className="animate-spin"/>Please Wait
          </>
        ):(
          "Purchase Course"
        )
      }
       </Button>
    </div>
  );
}

export default BuyCoursePurchase;
