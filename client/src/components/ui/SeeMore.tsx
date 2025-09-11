import React, { useState } from "react";

interface SeeMoreProps {
  text: string;
  limit?: number;
}

export const SeeMore: React.FC<SeeMoreProps> = ({ text, limit = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) {
    return <span className="">{text}</span>;
  }

  const displayText = expanded ? text : `${text.slice(0, limit).trim()}...`;

  return (
    <div className="leading-relaxed">
      {displayText}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 hover:text-blue-800 font-medium ml-1.5 text-sm transition-colors duration-200 focus:outline-none inline-block"
      >
        {expanded ? "Show less" : "See more"}
      </button>
    </div>
  );
};
