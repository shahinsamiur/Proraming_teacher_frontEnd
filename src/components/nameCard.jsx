import React from "react";

const NameCard = ({fild_name,value}) => {
  return (
    <div className="bg-inherit px-[3%] font-thin w-[45%] inline-flex flex-row text-white items-center justify-between">
      <h1 className="text-[1.2vw] ">{fild_name}:</h1>
      <p className="text-[1.2vw]">{value}</p>
    </div>
  );
};

export default NameCard;
