import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, className }: { children: React.ReactNode, className?: string  }) => {
  return (
    <section className="h-screen w-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className={`${className} flex w-full min-h-[calc(100vh-4rem)] px-4`}>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
