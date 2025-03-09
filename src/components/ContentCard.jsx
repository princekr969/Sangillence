import React from "react";

const ContentCard = ({ title, description, bgColor, textColor = "text-gray-800" }) => {
  return (
    <div className={`p-8 rounded-lg ${bgColor}`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <p className={textColor}>{description}</p>
    </div>
  );
};

export default ContentCard;
