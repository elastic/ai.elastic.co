import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Container({ children }) {
  return (
    <div className={`container md:max-w-7xl mx-auto px-4 ${inter.className}`}>
      {children}
    </div>
  );
}
