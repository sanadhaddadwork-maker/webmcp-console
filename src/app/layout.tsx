import './globals.css';
import ClientLayout from './client-layout'; // Or wherever your client layout / children are wrapped

export const metadata = {
  title: 'WebMCP Console',
  description: 'Enterprise Edge Proxy & Telemetry Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#030014]">
      <body className="min-h-screen bg-[#030014] text-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
