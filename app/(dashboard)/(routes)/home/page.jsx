import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home({ children }) {
  return (
    <main className="flex h-[100vh] w-full " >
      <Sidebar />
      {children}
    </main>
  );
}
