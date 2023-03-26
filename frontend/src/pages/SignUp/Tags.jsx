import React from "react";

export default function Tags({ tags, setTags }) {
  const listOfTags = [
    {
      Name: "user",
      Description: "Just here to discover vendors",
    },
    {
      Name: "food",
      Description: "We serve food at events",
    },
    {
      Name: "goodies",
      Description: "We provide goodies for events",
    },
    {
      Name: "lawnProvider",
      Description: "We provide lawns for events",
    },
    {
      Name: "professionalSpace",
      Description: "We provide professional Spaces for events",
    },
  ];
  return (
    <div className="flex flex-col mx-auto justify-center w-full ">
      {listOfTags.map((tagValue) => {
        return (
          <div
            className={`bg-gray-100 border border-gray-400 hover:bg-gray-200 rounded-md text-gray mx-auto px-4 py-2 m-1 cursor-pointer w-80`}
            onClick={() => {
              setTags(tagValue.Name);
            }}>
            {tagValue.Description}
          </div>
        );
      })}
    </div>
  );
}
