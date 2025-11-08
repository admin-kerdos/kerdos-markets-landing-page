"use client";

import { Briefcase, FileText, Home, User } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#hero", icon: Home },
    { name: "About", url: "#how-it-works", icon: User },
    { name: "Projects", url: "#projects", icon: Briefcase },
    { name: "Resume", url: "#faq", icon: FileText }
  ];

  return <NavBar items={navItems} />;
}
