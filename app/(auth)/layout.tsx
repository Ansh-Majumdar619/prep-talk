import { ReactNode } from "react";
import Cursor from '@/components/Cursor';
import PageWrapper from '@/components/PageWrapper';
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {

  const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) redirect("/");
  

  return <PageWrapper> <div className="auth-layout" >{children} <Cursor /> </div>;</PageWrapper>

};

export default AuthLayout;
