'use client'
import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { Inter } from 'next/font/google'

import AddImageForm from '@/components/add-image-form/add-image-form';
import NewClientForm from '@/components/new-client-form/new-client-form';
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  BellIcon,
  FireIcon,
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";


const navigation = [
  { name: "User Profile", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Add Clients", href: "/add-clients", icon: ArrowTrendingUpIcon, current: false },
  { name: "Upload Image", href: "/upload-image", icon: UserGroupIcon, current: false },
  { name: "Share Image", href: "/share-image", icon: ChatBubbleBottomCenterTextIcon, current: false },
  { name: "Transactions", href: "/trnsaction", icon: ChatBubbleBottomCenterTextIcon, current: false },
];

const communities = [
  { name: "React", href: "#" },
  { name: "Flutter", href: "#" },
  { name: "Next JS", href: "#" },
  { name: "Android", href: "#" },
  { name: "JavaScript", href: "#" },
  { name: "Java", href: "#" },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const inter = Inter({ subsets: ['latin'] })
const SideNav = ({children}) => {
    return (
        <>
          <div className="min-h-full">
            <div className="py-10">
              <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
                <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                  <nav
                    aria-label="Sidebar"
                    className="sticky top-4 divide-y divide-gray-300"
                  >
                    <div className="space-y-1 pb-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50",
                            "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      ))}
                    </div>
                    {/* <div className="pt-10 pb-5">
                      <p
                        className="px-3 text-sm font-medium text-gray-500"
                        id="communities-headline"
                      >
                        Popular Tags
                      </p>
                      <div
                        className="mt-3 space-y-2"
                        aria-labelledby="communities-headline"
                      >
                        {communities.map((community) => (
                          <a
                            key={community.name}
                            href={community.href}
                            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <span className="truncate">{community.name}</span>
                          </a>
                        ))}
                      </div>
                    </div> */}
                  </nav>
                </div>
                    <main className="lg:col-span-12 xl:col-span-10 px-5 justify-start">
                    <body className={inter.className}>{children}</body>
                    </main>
              </div>
              
            </div>
          </div>              
        </>
      );
}

export default SideNav