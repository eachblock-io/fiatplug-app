import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusherSubscription = (setMessages: Function, message: any) => {
  useEffect(() => {
    const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
      cluster: "mt1",
    });

    // Subscribe to a Pusher channel
    const channel = pusher.subscribe(`chat.message`);

    // Bind to a custom event
    const handleNewMessage = (data: any) => {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        data?.attributes?.message,
      ]);
    };
    channel.bind("message.sent", handleNewMessage);

    return () => {
      // Unbind event listener when component unmounts
      channel.unbind("message.sent", handleNewMessage);
      // Unsubscribe from Pusher channel
      channel.unsubscribe();
    };
  }, [setMessages, message]);
};

export default usePusherSubscription;
