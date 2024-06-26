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
import { useRouter } from "next/navigation";

const ChatPage = ({ userData, chatRoomID }: any) => {
  const { push } = useRouter();
  const [messages, setMessages] = useState<any>([]);
  const [chats, setChats] = useState<any>();
  const [loadingChats, setLoadingChats] = useState<any>(false);
  const [activeUser, setActiveUser] = useState<any>();
  const [active, setActive] = useState<any>();
  const [messageToSend, setMessageToSend] = useState("");
  const [roomID, setRoomID] = useState("");
  const [triggerModal, setTriggerModal] = useState<any>([]);
   const [loading, setLoading] = useState<any>(false);

  

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
      setTriggerModal((prevMessages: any) => [...prevMessages, data]);
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
      // console.log(data);
      setMessageToSend("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Submit the form when Enter is pressed without the Shift key
      handleSubmit(e);
    }
  };

  function getTriggerUserModal(arr: string | any[]) {
    if (arr.length === 0) {
      return null; // Return null if the array is empty
    } else {
      const lastObject = arr[arr.length - 1]; // Get the last object in the array
      // setLatestTrans(lastObject);
      return {
        triggerStatus: lastObject?.trigger_user_modal,
        latestTrans: lastObject?.attributes?.latest_transaction,
      }; // Return the value of the trigger_user_modal property
    }
  }

  const triggerUserModal = getTriggerUserModal(triggerModal);

  const handlePaidStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await fetchToken();
      if (triggerUserModal?.latestTrans?.type === "crypto_transaction") {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-order-status`,
          {
            id: triggerUserModal?.latestTrans?.attribute?.order_id,
            type: triggerUserModal?.latestTrans?.type,
            confirm_recieved: true,
          },
          {
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${token?.data?.token}`,
            },
          }
        );

        if (data?.status == "success") {
          push("/dashboard/feedback");
          toast.success("Payment confirmed ✅");
        }
      } else {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-order-status`,
          {
            id: triggerUserModal?.latestTrans?.attribute?.order_id,
            type: "gift_card_transaction",
            payment_recieved: true,
          },
          {
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${token?.data?.token}`,
            },
          }
        );
        if (data?.status == "success") {
          push("/dashboard/feedback");
          toast.success("Payment confirmed ✅");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] lg:h-[92vh] lg:absolute fixed bottom-0 top-0 right-0 left-0 w-full z-20 bg-white overflow-hidden">
      <div className="chats w-full lg:h-[92vh] h-[100vh] lg:mt-4 mt-14 relative bg-white">
        <div className="inputs z-10 px-8 py-3  lg:h-[10vh] h-[10vh] shadow bg-white absolute top-0 right-0 left-0 w-full flex items-center justify-start ">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/chat">
              <IoIosArrowBack className="text-2xl mr-2" />
            </Link>
            <Avatar className="p-0 m-0 h-10 w-10 border border-gray-600">
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
        <ScrollArea className="lg:h-[80vh] h-[80vh] lg:pb-0 pb-20 pt-28  pr-10 pl-10 bg-white">
          <ChatBoardScreen data={messages} />
          {triggerUserModal?.triggerStatus ? (
            <div className="">
              <form
                onSubmit={handlePaidStatus}
                className=" p-3 lg:w-6/12 lg:ml-auto mx-auto w-full pt-[4rem] pb-[6rem] ">
                <div className="bg-gray-200 py-4 px-4 flex space-x-2 mt-4">
                  <div>
                    <MdError className="g:text-2xl text-lg text-orange-400" />
                  </div>
                  <p className="lg:text-sm text-xs text-gray-600">
                    Only input a valid crypto address. Incorrect addresses may
                    result in irreversible transactions.
                  </p>
                </div>
                <div className="flex space-x-3 mt-6 mb-8">
                  <Checkbox
                    id="terms"
                    required
                    className="lg:h-6 lg:w-6 h-4 w-4"
                  />
                  <label
                    htmlFor="terms"
                    className="g:text-sm text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I have recieved the correct amount to my bank. And I hereby
                    confirm the order as completed.
                  </label>
                </div>
                <Button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-500 lg:h-14 h-10 font-normal text-white rounded-full text-center px-10">
                  {loading ? "Confirming..." : "Confirm order as paid"}
                </Button>
              </form>
            </div>
          ) : null}
        </ScrollArea>
        {/* Type message input */}
        <div className="inputs h-[12vh] px-4 border bg-white absolute bottom-0 right-0 left-0 w-full flex items-center justify-center ">
          <form
            onClick={handleSubmit}
            className="input flex items-center space-x-4 lg:w-10/12 w-full">
            <textarea
              rows={2}
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              placeholder="Message"
              className="w-full px-8 pt-2 bg-white border rounded-lg "
              onKeyDown={handleKeyPress}
            />
            <div className="">
              <button
                type="submit"
                className="bg-orange-400 rounded-lg hover:bg-orange-600 lg:h-14 lg:w-14 h-12 w-12 flex items-center justify-center">
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
