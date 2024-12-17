"use client"

import { UserButton } from "@/components/user-button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-6 bg-background">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <UserButton />
    </header>
  )
}

