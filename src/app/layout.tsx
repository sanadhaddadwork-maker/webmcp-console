import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "WebMCP Console | Secure Agent Proxy & SaaS",
  description: "Manage your AI agent infrastructure and subscriptions.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="10" fill="%23030014"/><path d="M10 10L14 22L16 16L18 22L22 10" stroke="%2322d3ee" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white relative bg-[#030014] bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
