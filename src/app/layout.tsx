import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#96C6FF] to-[#5A7799] flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
