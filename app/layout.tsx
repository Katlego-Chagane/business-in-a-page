import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Model Canvas",
  description: "Create and manage your business model canvas.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} h-full`}>
        <SidebarProvider>
          <div className="flex min-h-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <div className="flex-1 overflow-hidden">
                <main className="h-full px-4 py-6 lg:px-6">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

