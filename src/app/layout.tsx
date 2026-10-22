import './globals.css';

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
    <html lang="en">
      <body className="min-h-screen bg-[#030014] text-white antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
