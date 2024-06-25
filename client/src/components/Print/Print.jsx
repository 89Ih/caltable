import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const Printer = ({ children }) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="w-full flex flex-col" >
      <div className="w-full" ref={contentToPrint}>
        {children}
      </div>
      <button
        className="fixed bottom-3 right-4"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
      >
        <svg
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 64 64"
          enableBackground="new 0 0 64 64"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#F9EBB2"
                d="M12,3c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1v9H12V3z"
              ></path>
              <path
                fill="#F9EBB2"
                d="M52,61c0,0.553-0.447,1-1,1H13c-0.553,0-1-0.447-1-1V37c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1V61z"
              ></path>
              <path
                fill="#45AAB8"
                d="M62,48c0,1.104-0.896,2-2,2h-6V36c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2v14H4c-1.104,0-2-0.896-2-2 V16c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V48z"
              ></path>
              <g>
                <path
                  fill="#394240"
                  d="M60,12h-6V2c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2v10H4c-2.211,0-4,1.789-4,4v32 c0,2.211,1.789,4,4,4h6v10c0,1.105,0.895,2,2,2h40c1.105,0,2-0.895,2-2V52h6c2.211,0,4-1.789,4-4V16C64,13.789,62.211,12,60,12z M12,3c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1v9H12V3z M52,61c0,0.553-0.447,1-1,1H13c-0.553,0-1-0.447-1-1V37 c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1V61z M62,48c0,1.104-0.896,2-2,2h-6V36c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2 v14H4c-1.104,0-2-0.896-2-2V16c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V48z"
                ></path>
                <path
                  fill="#394240"
                  d="M19,44h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H19c-0.553,0-1,0.447-1,1S18.447,44,19,44z"
                ></path>
                <path
                  fill="#394240"
                  d="M45,48H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S45.553,48,45,48z"
                ></path>
                <path
                  fill="#394240"
                  d="M38,54H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h19c0.553,0,1-0.447,1-1S38.553,54,38,54z"
                ></path>
                <path
                  fill="#394240"
                  d="M55,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S56.657,18,55,18z M55,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S55.553,22,55,22z"
                ></path>
                <path
                  fill="#394240"
                  d="M45,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S46.657,18,45,18z M45,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S45.553,22,45,22z"
                ></path>
              </g>
              <g>
                <circle fill="#B4CCB9" cx="45" cy="21" r="1"></circle>
              </g>
              <circle fill="#F76D57" cx="55" cy="21" r="1"></circle>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};
