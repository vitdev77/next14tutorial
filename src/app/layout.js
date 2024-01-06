// import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: {
    default: "Next.js 14 Homepage",
    template: "%s | Next.js 14",
  },
  description: "Next.js starter app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
