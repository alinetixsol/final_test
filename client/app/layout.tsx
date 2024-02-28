"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pageWrapper d-md-block d-lg-flex">
          {/******** Sidebar **********/}
          <aside
            className={`sidebarArea shadow bg-white ${
              !open ? "" : "showSidebar"
            }`}
          >
            <Sidebar showMobilemenu={() => showMobilemenu()} />
          </aside>
          {/********Content Area**********/}

          <div className="contentArea ">
            {/********header**********/}
            <Header showMobmenu={() => showMobilemenu()} />

            {/********Middle Content**********/}
            <div className=" max-w-full bg-white">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
