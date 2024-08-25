import type { Metadata } from "next";
import { signika } from "@/lib/font";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-components";
import Navigation from "@/components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Surj",
  description: "CV Generation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={signika.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-white from-40% to-90% to-blanc dark:from-black dark:to-[#1B212B]">
            <header className="">
              <Navigation />
            </header>
            <main className="mb-auto">{children}</main>
            <footer className=" flex justify-center py-4 ">
              <p className="text-xl">
                Thank you for using Surj © {new Date().getFullYear()}
              </p>
            </footer>
          </div>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
