"use client";
import { useState, useEffect } from "react";
import { NotificationDropdown } from "./NotificationDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Pusher from "pusher-js";
import Notify from "@/lib/utils";
import Link from "next/link";

const Header = ({ data }: any) => {
  const [toggle, setToggle] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const [user, setUser] = useState<any>();

  const handleToggleNotify = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (window != undefined) {
      const userData: any = localStorage.getItem("userData");
      setUser(JSON.parse(userData));
    }
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
    <div className="flex justify-between items-center lg:sticky fixed top-0 bg-white lg:px-14 px-6 pt-2 mx-auto h-[8vh] z-20 w-full">
      <Link
        href="/dashboard/profile"
        className="flex items-center space-x-2 lg:hidden">
        <Avatar className="p-0 m-0">
          <AvatarImage src={user?.attributes?.profile_picture} />
          <AvatarFallback className="font-bold">
            {user?.attributes?.first_name[0]}
            {user?.attributes?.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold">
            Hi, {user?.attributes?.first_name}
          </p>
        </div>
      </Link>
      <h2 className="font-bold lg:block hidden">
        Hi, {user?.attributes?.first_name}
      </h2>
      <NotificationDropdown />
    </div>
  );
};

export default Header;
