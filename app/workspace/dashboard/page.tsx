"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, PenSquare, Plus, Trash } from 'lucide-react'
import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const dummyModels = [
  { 
    id: 1, 
    title: "E-commerce Platform", 
    type: "Business Canvas Model",
    description: "An online marketplace for artisanal products, connecting local craftsmen with global customers.",
    createdAt: "2023-12-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "Mobile App Startup", 
    type: "Business Canvas Model",
    description: "A revolutionary fitness app that uses AI to create personalized workout plans and track progress.",
    createdAt: "2023-12-14T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "SaaS Product Development", 
    type: "Business Canvas Model",
    description: "A cloud-based project management tool designed specifically for remote teams in the tech industry.",
    createdAt: "2023-12-13T09:15:00Z" 
  },
  { 
    id: 4, 
    title: "Nonprofit Organization", 
    type: "Business Canvas Model",
    description: "An environmental nonprofit focused on urban reforestation and community engagement in green initiatives.",
    createdAt: "2023-12-12T16:45:00Z" 
  },
]

const modelActions = [
  {
    title: "Download",
    description: "Export your canvas as a PDF",
    icon: Download,
    action: (modelId: number) => console.log(`Downloading model ${modelId}`),
  },
  {
    title: "Write Notes",
    description: "Add notes to your canvas",
    icon: PenSquare,
    action: () => {},
    disabled: true,
    comingSoon: true,
  },
  {
    title: "Delete",
    description: "Permanently remove this canvas",
    icon: Trash,
    action: (modelId: number, setOpenModelId: (id: number | null) => void, setDeleteConfirmation: (state: boolean) => void) => {
      setOpenModelId(null);
      setDeleteConfirmation(true);
    },
    destructive: true,
  },
]

export default function DashboardPage() {
  const [openModelId, setOpenModelId] = useState<number | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [deleteText, setDeleteText] = useState("")
  const [modelToDelete, setModelToDelete] = useState<number | null>(null)

  const handleDelete = (modelId: number) => {
    if (deleteText === "DELETE") {
      console.log(`Deleting model ${modelId}`);
      setDeleteConfirmation(false);
      setDeleteText("");
      setModelToDelete(null);
      // Here you would typically call an API to delete the model
    }
  }

const truncateString = (str: string, num: number = 25) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, John Dohn</h1>
        <p className="text-sm text-muted-foreground">Below is an overview of your models</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{dummyModels.length} Business Models</p>
          <Button asChild variant="default" size="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/workspace/model/add">
              <Plus className="mr-2 h-4 w-4" /> New Model
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dummyModels.map((model) => (
          <Dialog key={model.id} open={openModelId === model.id} onOpenChange={(open) => setOpenModelId(open ? model.id : null)}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50 border-[0.5px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{truncateString(model.title, 25)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <CardDescription className="line-clamp-2">
                      {truncateString(model.description || "No description provided.", 100)}
                    </CardDescription>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {model.type}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Created on {formatDate(model.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle className="text-lg font-semibold mb-4">Actions for {model.title}</DialogTitle>
              <div className="grid gap-4">
                {modelActions.map((action) => (
                  <Card 
                    key={action.title} 
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${action.destructive ? 'hover:bg-red-100 dark:hover:bg-red-900' : ''}`}
                    onClick={() => {
                      if (!action.disabled) {
                        if (action.destructive) {
                          action.action(model.id, setOpenModelId, setDeleteConfirmation);
                          setModelToDelete(model.id);
                        } else {
                          action.action(model.id);
                          setOpenModelId(null);
                        }
                      }
                    }}
                  >
                    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                      <action.icon className={`h-5 w-5 ${action.destructive ? 'text-red-600' : ''}`} />
                      <CardTitle className={`text-base ${action.destructive ? 'text-red-600' : ''}`}>{action.title}</CardTitle>
                      {action.comingSoon && (
                        <Badge variant="secondary" className="ml-auto">
                          Coming soon
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{action.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <Dialog open={deleteConfirmation} onOpenChange={setDeleteConfirmation}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <div className="py-4">
            <p>
              Please type DELETE to confirm you want to delete the canvas 
              "{modelToDelete !== null ? dummyModels.find(m => m.id === modelToDelete)?.title : ''}". 
              This action cannot be undone.
            </p>
          </div>
          <Input
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
            placeholder="Type DELETE to confirm"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => modelToDelete && handleDelete(modelToDelete)}
              disabled={deleteText !== "DELETE"}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

