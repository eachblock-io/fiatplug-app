import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatTime(timestamp: any) {
  const date = new Date(timestamp);
  const options = { hour: `2-digit`, minute: `2-digit`, hour12: true };
  const formattedTime = new Intl.DateTimeFormat(`en-US`, options as any).format(
    date
  );

  // Extracting the minute and AM/PM part
  const timeParts = formattedTime.match(/(\d{2}:\d{2})([APMapm]{2})/);
  if (timeParts) {
    return `${timeParts[1]}${timeParts[2].toLowerCase()}`;
  }

  return formattedTime; // fallback
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sendNotification(message: any, user: any) {
  const notification = new Notification("New message from FiatPlug", {
    icon: "https://res.cloudinary.com/calebcloud/image/upload/v1708217921/app_icon.png",
    body: `@${user}: ${message}`,
  });
  notification.onclick = () =>
    function () {
      window.open("http://localhost:3000/chat");
    };
}

export default function Notify(message: any, user: any) {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications!");
  } else if (Notification.permission === "granted") {
    sendNotification(message, user);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification(message, user);
      }
    });
  }
}
