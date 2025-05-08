import React from "react";

interface TextAreaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  names?:string;
  value?:string
  onBlur: (Event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ onChange, placeholder, names, value, onBlur }:TextAreaProps) => {
  return (
    <div className="w-full bg-transparent flex justify-between ">
    <textarea
    name={names}
    value={value}
    onBlur={onBlur}
      className="w-500 h-32 resize-none p-2 border-[1.9px] border-slate-500 rounded-md outline-none  focus:ring-1 focus:ring-black focus:rounded-md"
      onChange={onChange}
      placeholder={placeholder}
    />
    </div>
  );
};

export default TextArea;