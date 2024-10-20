"use client";
import Sidebar from "@/components/Shared/Sidebar";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isLoggedIn } from '@/services/auth.services';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen my-2">
      <div className="flex justify-between">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
      </div>
    </div>
  );
};

export default Dashboardlayout;