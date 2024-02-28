"use client";
import { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { NotificationDropdown } from "./NotificationDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Pusher from "pusher-js";
import Notify from "@/lib/utils";

const Header = ({ data }: any) => {
  const [toggle, setToggle] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [currentMessage, setCurrentMessage] = useState<any>(null);

  const handleToggleNotify = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
      cluster: "mt1",
    });

    // Subscribe to a Pusher channel
    const channel = pusher.subscribe(`chat.message`);

    // Bind to a custom event
    channel.bind("message.sent", (data: any) => {
      setChats((prevMessages: any) => [
        ...prevMessages,
        data?.attributes?.message,
      ]);
    });

    return () => {
      channel.unbind_all();
    };
  }, []);

  useEffect(() => {
    if (chats && chats.length > 0) {
      // Filter out messages from the current user
      const messagesFromOtherUsers = chats.filter(
        (message: any) => message?.user?.id != data?.id
      );

      if (messagesFromOtherUsers.length > 0) {
        // Find the latest message from the remaining messages
        const latestMessage = messagesFromOtherUsers.reduce(
          (prev: any, current: any) => {
            return new Date(prev.sent_at) > new Date(current.sent_at)
              ? prev
              : current;
          }
        );
        Notify(latestMessage?.message, latestMessage?.user?.full_name);
      } else {
        // If no messages from other users, set currentMessage to null
        setCurrentMessage(null);
      }
    } else {
      // If no data, set currentMessage to null
      setCurrentMessage(null);
    }
  }, [chats]);

  return (
    <div className="flex justify-between items-center lg:sticky fixed top-0 bg-white lg:px-14 px-6 pt-2 mx-auto h-[8vh] border-b border-gray-300 shadow-sm z-20 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 lg:hidden">
          <Avatar className="p-0 m-0">
            <AvatarImage src={data?.attributes?.profile_picture} />
            <AvatarFallback className="font-bold">
              {data?.attributes?.first_name[0]}
              {data?.attributes?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold">
              Hi, {data?.attributes?.first_name}
            </p>
          </div>
        </DropdownMenuTrigger>
        {/* <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              onSubmit={handleCheckLogout}
              variant="ghost"
              className="flex w-full items-center justify-start hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
              <TbLogout className="text-2xl text-gray-500 hover:text-zinc-800" />
              <p>Logout</p>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent> */}
      </DropdownMenu>
      <h2 className="font-bold lg:block hidden">
        Hi, {data?.attributes?.first_name}
      </h2>
      <NotificationDropdown />
    </div>
  );
};

export default Header;
