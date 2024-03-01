"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoCameraOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SettingsForm = ({ user }: any) => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewSrc("");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-14 ">
        <div className="lg:w-24 lg:h-24 w-20 h-20 relative">
          <Avatar className="p-0 m-0 lg:w-24 lg:h-24 w-20 h-20 border border-gray-600">
            <AvatarImage
              className="w-100"
              src={previewSrc ? previewSrc : user?.attributes?.profile_picture}
            />
            <AvatarFallback className="font-bold lg:text-2xl">
              {user?.attributes?.first_name[0]}
              {user?.attributes?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="fileInput"
            className="flex justify-center items-center absolute bottom-[0rem] right-[-1rem] h-10 w-10 bg-[#F9A21B] rounded-full p-2 cursor-pointer">
            <IoCameraOutline className="text-4xl text-gray-800" />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <p className="text-center mt-2">Edit Profile</p>
      <form className="mt-8 space-y-6 mx-auto w-full">
        <Input
          type="text"
          required
          value={fullName ? fullName : user?.attributes?.first_name}
          placeholder="Full Name"
          className="w-full h-14 px-6 border border-gray-500"
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          required
          value={lastName ? lastName : user?.attributes?.last_name}
          placeholder="Last name"
          className="w-full h-14 px-6 border border-gray-500"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          required
          value={email ? email : user?.attributes?.email}
          placeholder="Email Address"
          className="w-full h-14 px-6 border border-gray-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="">
          <Button className="w-full bg-[#F9A21B] hover:bg-[#F9A21B] text-lg font-demibold rounded-full p-8 mt-10">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
