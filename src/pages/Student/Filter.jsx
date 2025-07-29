import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"

const Category = [
  { id: "NextJs", label: "Next Js" },
  { id: "NodeJs", label: "Node Js" },
  { id: "ReactJs", label: "React Js" },
  { id: "Docker", label: "Docker" },
  { id: "DataScience", label: "Data Science" },
  { id: "MarnStack", label: "Mern Stack Developer" },
  { id: "Python", label: "Python" },
  { id: "Html", label: "Html" },
  
];
function Filter({handlefilerChange}) {
   const [selectedCategories,SetSelectedCategories]=useState([]);
    const [selectedSortBy, setSelectedSortBy]=useState("");

  const HandleCategory=(categoryId)=>{
    SetSelectedCategories((prevCategory)=>{
      const newCategory=prevCategory.includes(categoryId) ?
      prevCategory.filter((cat) => cat!==categoryId) :
      [...prevCategory,categoryId];
      handlefilerChange(newCategory,selectedSortBy);
      return newCategory;
    })
  }

  const priceHandler=(value)=>{
    setSelectedSortBy(value);
    handlefilerChange(selectedCategories,value);
  }
  return (
<div className="">
  {/* Align Filter Option and Dropdown in a Row */}
  <div className="flex items-center justify-between mb-4">
    <span className="font-semibold text-xl mr-8 leading-none">Filter</span>
    <Select onValueChange={(value) => priceHandler(value)}>
      <SelectTrigger className="w-full md:w-auto">
        {/* Make select trigger take full width on small screens, auto on medium */}
        <div className="">
          <SelectValue placeholder="Sort By" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By Price</SelectLabel>
        </SelectGroup>
        <SelectItem value="low">Low To High</SelectItem>
        <SelectItem value="high">High To Low</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <Separator className="my-4" />

  {/* Category Section */}
  <div>
    <h1 className="font-semibold mt-12 mb-4">Category</h1>
    {Category.map((data, index) => (
      <div key={index} className="flex items-center mb-2">
        <Checkbox id={data.id} onCheckedChange={() => HandleCategory(data.id)} />
        <label
          htmlFor="terms"
          className="text-sm font-medium ml-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {data.label}
        </label>
      </div>
    ))}
  </div>
</div>
  );
  
}

export default Filter;
