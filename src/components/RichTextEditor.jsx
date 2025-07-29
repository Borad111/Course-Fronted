import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const RichTextEditor = ({input,SetInput}) => {
    
    const handleChange=(content)=>{
        SetInput((prevInput) => ({
            ...prevInput, // keep other fields unchanged
            description: content || '' // update only the description
          }));
    }
    // eslint-disable-next-line react/prop-types
    return <ReactQuill theme="snow" value={input.description || ''} onChange={handleChange} />;
}

export default RichTextEditor
