"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

interface BreadcrumbNavProps {
  items: {
    title: string
    href: string
  }[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const pathname = usePathname()

  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink 
            href={item.href}
            className={pathname === item.href ? "text-blue-600 font-medium" : ""}
          >
            {item.title}
          </BreadcrumbLink>
          {index < items.length - 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

