"use client";
 
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  UserPlus,
  MessageCircle,
  Sparkles,
  User,
  MoreHorizontal,
} from "lucide-react";
 
interface NavUser {
  handle: string;
  displayName: string;
  avatarUrl?: string;
}
 

 
  
  
  const links = [
    { label: "Home", href: "/home", Icon: Home },
    { label: "Explore", href: "#", Icon: Search },
    { label: "Notifications", href: "#", Icon: Bell },
    { label: "Follow", href: "#", Icon: UserPlus },
    { label: "Chat", href: "#", Icon: MessageCircle },
    { label: "Grok", href: "#", Icon: Sparkles },
    { label: "Profile", href: `#`, Icon: User },
    { label: "More", href: "#", Icon: MoreHorizontal },
  ];
 
  return (
    <nav className="w-[275px] h-screen sticky top-0 flex flex-col px-3 py-2">
      <Link href="/home" className="p-3 w-fit">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-black" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>
 
      <ul className="flex-1 mt-1">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className={`flex items-center gap-5 px-3 py-3 rounded-full w-fit text-xl hover:bg-gray-100 transition  "font-bold" : ""
              }`}
            >
              <Icon size={26}  />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
 
      <Link href="/home">
        <button className="w-[90%] py-3.5 my-2 rounded-full bg-black text-white font-bold text-[17px] hover:bg-gray-800 transition">
          Post
        </button>
      </Link>
 
      <button
       
        className="flex items-center gap-3 p-3 rounded-full hover:bg-gray-100 transition mt-auto text-left"
      >
        <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold shrink-0">
          
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm truncate"></div>
          <div className="text-gray-500 text-sm">@</div>
        </div>
        <span className="text-xs text-gray-500">Log out</span>
      </button>
    </nav>
  );
