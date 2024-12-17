import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus } from 'lucide-react'
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const dummyModels = [
  { 
    id: 1, 
    title: "E-commerce Platform", 
    type: "Business Canvas Model",
    createdAt: "2023-12-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "Mobile App Startup", 
    type: "Business Canvas Model",
    createdAt: "2023-12-14T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "SaaS Product Development", 
    type: "Business Canvas Model",
    createdAt: "2023-12-13T09:15:00Z" 
  },
  { 
    id: 4, 
    title: "Nonprofit Organization", 
    type: "Business Canvas Model",
    createdAt: "2023-12-12T16:45:00Z" 
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav
        items={[
          { title: "Workspace", href: "/workspace" },
          { title: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Welcome, John Dohn</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{dummyModels.length} Business Models</p>
          <Button asChild>
            <Link href="/model/add">
              <Plus className="mr-2 h-4 w-4" /> New Model
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyModels.map((model) => (
          <Card key={model.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {model.title.length > 12 
                  ? `${model.title.slice(0, 12)}...` 
                  : model.title}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    Write Notes
                    <Badge variant="secondary" className="ml-2">
                      Coming soon
                    </Badge>
                  </DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This will permanently delete &quot;{model.title}&quot;
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit">
                  {model.type}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(model.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

