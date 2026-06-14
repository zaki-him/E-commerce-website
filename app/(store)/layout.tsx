import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <CartSidebar />
    </>
  );
}
