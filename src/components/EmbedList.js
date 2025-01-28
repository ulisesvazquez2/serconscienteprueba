import React from 'react';

const EmbedList = ({ embeds }) => {
  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
      {embeds.map((embed, index) => (
        <div key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: embed }} />
      ))}
    </div>
  );
};

export default EmbedList;