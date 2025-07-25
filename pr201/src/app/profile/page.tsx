"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Clock, Users, Search } from "lucide-react";
import Image from "next/image";

import "./profile.css";
import MainPage from "../Components/MainPage";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex justify-center items-center">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex justify-center items-center">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="profile-layout">

      {/* Profile Content */}
      <div className="profile-content">
        <div className="profile-container">
          <div className="flex flex-col items-center space-y-6">

            {/* Avatar */}
            <Avatar className="profile-avatar">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            {/* Name and Handle */}
            <div className="text-center">
              <h1 className="profile-name">{session.user.name}</h1>
              <p className="profile-handle">@{session.user.email?.split("@")[0]}</p>
            </div>

            {/* Followers/Following */}
            <div className="profile-stats">
              <div className="profile-stat">
                <p className="profile-stat-value">0</p>
                <p className="profile-stat-label">Followers</p>
              </div>
              <div className="profile-stat">
                <p className="profile-stat-value">0</p>
                <p className="profile-stat-label">Following</p>
              </div>
            </div>

            {/* Share Button */}
            <Button variant="outline" className="profile-share-btn">
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>

            {/* CTA Button */}
            <Button className="profile-cta-btn">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-28%20at%2012.28.40%20AM-J8Zhba22Tq2DgrB2afgVhoSwuaolIB.jpeg"
                alt="Cook Icon"
                width={24}
                height={24}
              />
              <span>Start your healthier life with Mr. Cook Plus</span>
            </Button>

            {/* Navigation Grid */}
            <div className="profile-nav-grid">
              <Button variant="secondary" className="profile-nav-btn">
                <MessageCircle className="w-5 h-5 mr-2" />
                Feedback
              </Button>
              <Button variant="secondary" className="profile-nav-btn">
                <Clock className="w-5 h-5 mr-2" />
                Updates
              </Button>
              <Button variant="secondary" className="profile-nav-btn">
                <Users className="w-5 h-5 mr-2" />
                Invite people
              </Button>
              <Button variant="secondary" className="profile-nav-btn">
                <Search className="w-5 h-5 mr-2" />
                Search for users
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
