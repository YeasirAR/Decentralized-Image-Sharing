import React from 'react';
import { Inter } from 'next/font/google';
import AddImageForm from '@/components/add-image-form/add-image-form';
import NewClientForm from '@/components/new-client-form/new-client-form';
import {
  ArrowTrendingUpIcon,
  HomeIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'User Profile', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'Add Clients', href: '/add-clients', icon: ArrowTrendingUpIcon, current: false },
  { name: 'Upload Image', href: '/upload-image', icon: UserGroupIcon, current: false },
  { name: 'Transactions', href: '/transactions', icon: ChatBubbleBottomCenterTextIcon, current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const inter = Inter({ subsets: ['latin'] });

const SideNav = ({ children }) => {
  return (
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
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50',
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <main className="lg:col-span-12 xl:col-span-10 px-5 justify-start">
            <div className={inter.className}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
