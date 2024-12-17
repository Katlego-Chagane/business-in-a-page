"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Wand2, Download, Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import { PageContainer } from "@/components/page-container"
import Link from "next/link"
import { generateBusinessCanvasPDF } from '@/lib/pdf/utils'
import { toast } from 'sonner'
import type { BusinessCanvas } from '@/types'

const steps = [
  { id: 1, title: 'Canvas Details' },
  { id: 2, title: 'Generation' },
]

export default function BusinessCanvasPage() {
  const [canvasName, setCanvasName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [currentStep, setCurrentStep] = useState<'input' | 'generating' | 'complete'>('input')
  const [generatedCanvas, setGeneratedCanvas] = useState<BusinessCanvas | null>(null)
  const router = useRouter()

  const handleGenerate = async () => {
    setCurrentStep('generating')
    try {
      const response = await fetch('/api/generate-canvas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: canvasName,
          prompt,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate canvas')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setGeneratedCanvas(data)
      setCurrentStep('complete')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error.message || 'Failed to generate canvas')
      setCurrentStep('input')
    }
  }

  const handleDownload = async () => {
    if (!generatedCanvas) {
      toast.error('No canvas data available')
      return
    }

    try {
      const pdfDataUri = generateBusinessCanvasPDF(generatedCanvas)
      
      // Create a link element and trigger download
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `${canvasName.toLowerCase().replace(/\s+/g, '-')}-canvas.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Canvas downloaded successfully')
      router.push("/workspace/dashboard")
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    }
  }

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <Link href="/workspace/model/add" className="hover:text-foreground">
            New Model
          </Link>
          <span>/</span>
          <span>Business Canvas</span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                currentStep === 'input' && step.id === 1 ? "bg-blue-600 text-white" : 
                (currentStep === 'generating' || currentStep === 'complete') && step.id === 2 ? "bg-blue-600 text-white" : 
                "bg-muted text-muted-foreground"
              )}>
                {step.id}
              </div>
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="ml-4 h-[2px] w-16 bg-muted" />
              )}
            </div>
          ))}
        </div>

        {currentStep === 'input' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <Input
                id="name"
                value={canvasName}
                onChange={(e) => setCanvasName(e.target.value)}
                placeholder="The Coffee Hub"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Describe Your Business Idea
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="I want to create a modern coffee shop targeting busy commuters, offering quick service and high-quality beverages..."
                rows={5}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGenerate}
                disabled={!canvasName || !prompt}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Canvas
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-sm text-muted-foreground">Generating your business canvas...</p>
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 rounded-full bg-blue-50 p-3">
              <Check className="h-12 w-12 text-blue-600" />
            </div>
            <p className="mb-8 text-sm text-muted-foreground">Your business canvas has been created successfully!</p>
            <Button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download and Continue
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

