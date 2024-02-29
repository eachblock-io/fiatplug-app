"use client";
import { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
import { dateFormaterAndTime } from "@/utils";
import { MdError } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ChatPage = () => {
  const [messages, setMessages] = useState<any>([]);
  const [chats, setChats] = useState<any>();
  const [loadingChats, setLoadingChats] = useState<any>(false);
  const [activeUser, setActiveUser] = useState<any>();
  const [active, setActive] = useState<any>();
  const [messageToSend, setMessageToSend] = useState("");
  const [roomID, setRoomID] = useState("");
  const [triggerModal, setTriggerModal] = useState<any>([]);

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
  }, [messages]);

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

  const updateReadMessages = async (roomID: any) => {
    setActive(roomID);
    const token = await fetchToken();
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/update-messages-in-chat-room`,
      {
        chat_room_id: roomID,
      },
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token?.data?.token}`,
        },
      }
    );
    fetchRecentChats();
  };

  const fetchActiveMessages = async (roomID: any) => {
    setActive(roomID);
    const token = await fetchToken();
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${roomID}`,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token?.data?.token}`,
        },
      }
    );
    setActiveUser(data?.data?.attributes?.receipents[0]);
    setMessages(data?.data.attributes?.messages);
    updateReadMessages(roomID);
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
          receiver_id: activeUser?.id,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token?.data?.token}`,
          },
        }
      );
      setRoomID(data?.data?.attributes?.room_id);
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
      // const { data } = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/orders/${}`,
      //   {
      //     payment_recieved: true,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": `application/json`,
      //       Authorization: `Bearer ${token?.data?.token}`,
      //     },
      //   }
      // );
      toast.success("Payment confirmed ✅");
    } catch (error) {}
  };

  function getTriggerUserModal(arr: string | any[]) {
    if (arr.length === 0) {
      return null; // Return null if the array is empty
    } else {
      const lastObject = arr[arr.length - 1]; // Get the last object in the array
      return lastObject.trigger_user_modal; // Return the value of the trigger_user_modal property
    }
  }

  const triggerUserModal = getTriggerUserModal(triggerModal);

  return (
    <div className=" lg:pt-0 pt-[4rem] w-full h-[92vh] flex lg:flex-row flex-col">
      {/* Mobile view */}
      <div className="w-full lg:hidden border bg-gray-100 px-14 h-[10vh] flex items-center justify-center ">
        {loadingChats ? (
          <div className="text-center">
            <ClipLoader size={20} color="#000" />
            <p> Loading chats...</p>
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}>
            <CarouselContent className="-ml-1">
              {chats?.map((user: any) => (
                <CarouselItem
                  key={user?.id}
                  onClick={() => fetchActiveMessages(user?.attributes?.id)}
                  className="pl-2 basis-1/1 md:basis-1/2 lg:basis-1/3">
                  <div className="border transition-all hover:bg-gray-100 p-2 bg-white rounded-full">
                    <div className="flex items-center lg:gap-4 gap-2">
                      <Avatar className="p-0 m-0 border border-gray-600">
                        <AvatarImage
                          src={user?.attributes?.receipents[0]?.profile_picture}
                        />
                        <AvatarFallback className="font-bold">
                          {user?.attributes?.receipents[0]?.first_name[0]}
                          {user?.attributes?.receipents[0]?.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
      {/* Desktop sidenav */}
      <div className="messages drop-shadow-lg w-[30vw] lg:block hidden border bg-gray-100 px-4 ">
        <input
          type="search"
          placeholder="Search...."
          className="border w-full px-4 h-[7vh] mt-4 rounded-full"
        />
        <div className="list space-y-6 mt-6">
          {chats?.map((user: any) => (
            <div
              key={user?.id}
              onClick={() => fetchActiveMessages(user?.attributes?.id)}
              className={`border cursor-pointer transition-all hover:bg-gray-100 p-3 bg-white rounded-xl ${
                active == user?.attributes?.id && `border border-gray-500`
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <Avatar className="p-0 m-0 border border-gray-600">
                    <AvatarImage
                      src={user?.attributes?.receipents[0]?.profile_picture}
                    />
                    <AvatarFallback className="font-bold">
                      {user?.attributes?.receipents[0]?.first_name[0]}
                      {user?.attributes?.receipents[0]?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-xs">
                      {user?.attributes?.receipents[0]?.first_name}{" "}
                      {user?.attributes?.receipents[0]?.last_name}
                    </h2>
                    <p className="text-xs mt-0 text-gray-600 rounded-lg ">
                      {user?.attributes?.last_message?.message?.slice(0, 26)}
                      ....
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-gray-500 text-sm">
                    {/* {dateFormaterAndTime(
                        user?.attributes?.last_message?.created_at
                      )} */}
                  </p>
                  {user?.attributes?.unread_messages === 0 ? null : (
                    <div className="h-6 w-6 mx-auto text-white rounded-full bg-orange-400 flex items-center justify-center">
                      <p className="text-xs font-semibold">
                        {user?.attributes?.unread_messages}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeUser ? (
        <div className="chats w-full  relative">
          <div className="inputs z-10 px-8 py-2 lg:h-[8vh] h-[6vh] border bg-white absolute top-0 right-0 left-0 w-full flex items-center justify-start ">
            <div className="flex items-center gap-2">
              <Avatar className="p-0 m-0 h-8 w-8 border border-gray-600">
                <AvatarImage src={activeUser?.profile_picture} />
                <AvatarFallback className="text-xs">
                  {activeUser?.first_name[0]}
                  {activeUser?.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-xs">
                  {activeUser?.first_name} {activeUser?.last_name}
                </h2>
              </div>
            </div>
          </div>
          <div>
            <>
              <ChatBoard data={messages} />
              {triggerUserModal ? (
                <div>
                  <form
                    onSubmit={handlePaidStatus}
                    className=" p-3 lg:w-6/12 lg:ml-auto mx-auto w-full pt-[4rem] pb-[8rem] ">
                    <div className="bg-gray-200 py-4 px-4 flex space-x-2 mt-4">
                      <div>
                        <MdError className="g:text-2xl text-lg text-orange-400" />
                      </div>
                      <p className="lg:text-sm text-xs text-gray-600">
                        Only input a valid crypto address. Incorrect addresses
                        may result in irreversible transactions.
                      </p>
                    </div>
                    <div className="flex space-x-3 mt-6 mb-8">
                      <Checkbox id="terms" className="lg:h-6 lg:w-6 h-4 w-4" />
                      <label
                        htmlFor="terms"
                        className="g:text-sm text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I have recieved the correct amount to my bank. And I
                        hereby confirm the order as completed.
                      </label>
                    </div>
                    <Button className="bg-orange-400 hover:bg-orange-500 lg:h-14 h-10 font-normal text-white rounded-full text-center px-10">
                      Confirm order as paid
                    </Button>
                  </form>
                </div>
              ) : null}
            </>
          </div>
          {/* Type message input */}
          <div className="inputs h-[12vh] px-4 pb-4 border bg-white absolute bottom-0 right-0 left-0 w-full flex items-center justify-center ">
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
      ) : (
        <div className="w-full z-10 h-[70vh] flex items-center justify-center ">
          <div className="text-center">
            <BsChatSquareDots className="lg:text-9xl mb-1 text-4xl mx-auto" />
            <p>Chats shows here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
