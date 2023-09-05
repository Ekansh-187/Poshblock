import React from "react";

const Loading = () => {
  let list = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="animate-pulse flex flex-col">
        {list.map((i) => (
          <div className="flex-1 space-y-6 py-1" key={i}>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
