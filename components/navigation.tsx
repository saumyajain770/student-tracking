"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, TrendingUp, Home } from "lucide-react"

const navigationItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/students", label: "Students", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2">
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href}>
            <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
