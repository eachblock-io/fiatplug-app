import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Notify from "@/lib/utils";

const ChatBoardScreen = ({ data }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (divRef.current) {
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  useEffect(() => {
    (async (async) => {
      const { data } = await axios.get("/api/me");
      setUser(data?.user);
    })();
  }, []);

  return (
    <ScrollArea className="lg:h-[75vh] h-[82vh] lg:pb-0 pt-16 pr-10 pl-10">
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
      <div ref={divRef}></div>
    </ScrollArea>
  );
};

export default ChatBoardScreen;
