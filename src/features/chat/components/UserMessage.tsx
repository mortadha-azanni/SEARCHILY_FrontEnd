import React from 'react';

export default function UserMessage({ content }: { content?: string }) {
  return (
    <div className="flex justify-end mb-8">
      <div className="bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black px-5 py-4 max-w-[80%] text-[14px] rounded-none shadow-[0_8px_30px_rgba(250,82,15,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-colors duration-200">
        {content}
      </div>
    </div>
  );
}
