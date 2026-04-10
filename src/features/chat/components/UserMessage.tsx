import React from 'react';

export default function UserMessage({ content }: { content?: string }) {
  return (
    <div className="flex justify-end mb-8">
      <div className="bg-mistral-black text-white px-5 py-4 max-w-[80%] text-sm rounded-none shadow-sm">
        {content}
      </div>
    </div>
  );
}
