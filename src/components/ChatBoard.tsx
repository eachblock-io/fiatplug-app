import axios from "axios";
import { useEffect, useState, useRef } from "react";

const ChatBoard = ({ data }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (divRef.current) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    (async (async) => {
      const { data } = await axios.get("/api/me");
      setUser(data?.user);
    })();
  }, []);

  return (
    <>
      {data?.map((message: any, i: any) => {
        const currentUser = message?.user?.id == user?.id;
        return (
          <div key={i} className="flex flex-col py-3 md:py-3">
            {!currentUser && (
              <div className="lg:w-[60%] w-11/12 ml-auto">
                <div className=" bg-[#F2F4F7] w-full shadow-4xl rounded-tl-none rounded-tr-lg rounded-b-lg px-2 py-4 text-sm font-medium text-[#444444] mb-1">
                  <p>{message?.message}</p>
                </div>
                <p className="text-xs font-normal text-[#667085]">
                  {message?.sent_at}
                </p>
              </div>
            )}
            {currentUser && (
              <div className="self-end lg:w-[40%] w-11/12">
                <div className=" bg-[#F9A21B] w-full shadow-4xl rounded-tr-lg rounded-b-xl px-4 py-4 text-sm font-medium text-[#fff] mb-1">
                  <p>{message?.message}</p>
                </div>
                <p className="text-xs font-normal text-[#667085]">
                  {message?.sent_at}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ChatBoard;
