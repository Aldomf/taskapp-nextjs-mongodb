import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import { Providers as ReaduxProvider } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReaduxProvider>
        <Providers>
          <body className={inter.className}>
            <NavBar />
            <main className="container mx-auto px-5 mt-4">{children}</main>
          </body>
        </Providers>
      </ReaduxProvider>
    </html>
  );
}
