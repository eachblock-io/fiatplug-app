import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import Logo from "@/public/logo.png";
import Image from "next/image";

const Header = ({ onClick, username }: any) => {

  return (
    <div className="flex justify-between items-center sticky top-0 bg-white  lg:px-14 px-4 mx-auto h-[10vh] border-b border-gray-300 shadow-sm z-20 w-full">
      <HiOutlineBars3BottomLeft
        onClick={onClick}
        className="lg:hidden block text-main text-4xl cursor-pointer"
      />
      <Image
        src={Logo}
        width="100"
        alt="Logo"
        className="w-20 lg:hidden flex"
      />
      <h2 className="font-bold lg:block hidden">Welcome, {username}</h2>
      <div className="profile flex items-center space-x-4">
        <IoNotifications className="text-2xl" />
        {/* <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-4 border py-2 px-4 rounded-lg">
            <Avatar className="p-0 m-0">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AY</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default Header;
