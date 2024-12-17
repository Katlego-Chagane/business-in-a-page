import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Users } from 'lucide-react'
import Link from 'next/link'

const managementOptions = [
  {
    title: "Billing",
    description: "Manage your subscription and billing details",
    icon: CreditCard,
    href: "/workspace/billing"
  },
  {
    title: "Manage Team",
    description: "Add or remove team members and manage permissions",
    icon: Users,
    href: "/workspace/team"
  }
]

export default function ManageWorkspacePage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <span>Manage</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {managementOptions.map((option) => (
            <Link key={option.title} href={option.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click to manage {option.title.toLowerCase()}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

