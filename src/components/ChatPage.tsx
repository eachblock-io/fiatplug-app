"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiSendPlaneFill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Pusher from "pusher-js";
import fetchToken from "@/lib/auth";
import axios from "axios";
import { BsChatSquareDots } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import ChatBoard from "@/components/ChatBoard";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { MdError } from "react-icons/md";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import ChatBoardScreen from "./ChatBoardScreen";

const ChatPage = ({ userData, chatRoomID }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [chats, setChats] = useState<any>();
  const [loadingChats, setLoadingChats] = useState<any>(false);
  const [activeUser, setActiveUser] = useState<any>();
  const [active, setActive] = useState<any>();
  const [messageToSend, setMessageToSend] = useState("");
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
      cluster: "mt1",
    });

    // Subscribe to a Pusher channel
    const channel = pusher.subscribe(`chat.message`);

    // Bind to a custom event
    channel.bind("message.sent", (data: any) => {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        data?.attributes?.message,
      ]);
    });

    return () => {
      channel.unbind_all();
    };
  }, [messages]);

  useEffect(() => {
    fetchRecentChats();
  }, []);

  const fetchRecentChats = async () => {
    setLoadingChats(true);
    try {
      const token = await fetchToken();
      const { data } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/recent`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token?.data?.token}`,
          },
        }
      );
      setLoadingChats(false);

      setChats(data?.data);
    } catch (error) {
      setLoadingChats(false);
    }
  };

  console.log(messages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageToSend("");
    if (messageToSend) {
      const token = await fetchToken();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/send`,
        {
          message: messageToSend,
          chat_room_id: chatRoomID,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token?.data?.token}`,
          },
        }
      );
      setRoomID(data?.data?.attributes?.room_id);
      console.log(data);
      setMessageToSend("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Submit the form when Enter is pressed without the Shift key
      handleSubmit(e);
    }
  };

  const handlePaidStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Paddy!!!!");

    try {
      const token = await fetchToken();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${userData?.id}`,
        {
          payment_recieved: true,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token?.data?.token}`,
          },
        }
      );
      toast.success("Payment confirmed ✅");
    } catch (error) {}
  };

  return (
    <div className="h-[88vh] lg:h-[90vh] absolute bottom-0 top-0 right-0 left-0 w-full z-10 bg-white overflow-hidden">
      <div className="chats w-full lg:h-[92vh] h-[81vh] lg:mt-4 mt-14 relative bg-white">
        <div className="inputs z-10 px-8 py-3  lg:h-[10vh] h-[10vh] border-b bg-gray-200 absolute top-0 right-0 left-0 w-full flex items-center justify-start ">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/chat">
              <IoIosArrowBack className="text-2xl mr-2" />
            </Link>
            <Avatar className="p-0 m-0 h-8 w-8 border border-gray-600">
              <AvatarImage src={userData?.attributes?.profile_picture} />
              <AvatarFallback className="text-xs"></AvatarFallback>
            </Avatar>
            {userData?.attributes?.full_name ? (
              <div>
                <h2 className="font-semibold text-xs">
                  {userData?.attributes?.full_name}
                </h2>
              </div>
            ) : (
              <h2 className="font-semibold text-xs">
                {userData?.attributes?.first_name}{" "}
                {userData?.attributes?.last_name}
              </h2>
            )}
          </div>
        </div>
        <ScrollArea className="lg:h-[80vh] h-[80vh] lg:pb-0 pb-20 pt-20  pr-10 pl-10 bg-gray-100">
          <ChatBoardScreen data={messages} />
        </ScrollArea>
        {/* Type message input */}
        <div className="inputs h-[12vh] px-4 border bg-white absolute bottom-0 right-0 left-0 w-full flex items-center justify-center ">
          <form
            onClick={handleSubmit}
            className="input flex items-center lg:w-10/12 w-full bg-gray-200 rounded-full">
            <textarea
              rows={1}
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              placeholder="Type a message here..."
              className="w-full px-8 bg-gray-200 rounded-full "
              onKeyDown={handleKeyPress}
            />
            <div className="">
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-600 lg:h-14 lg:w-14 h-12 w-12 rounded-full flex items-center justify-center">
                <RiSendPlaneFill className="lg:text-4xl text-2xl text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
