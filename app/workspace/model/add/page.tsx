import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const modelTypes = [
  {
    id: 1,
    title: "Business Canvas Model",
    description: "Create a comprehensive business model canvas",
    href: "/workspace/model/add/business-canvas",
    isAvailable: true
  },
  {
    id: 2,
    title: "PESTEL Analysis",
    description: "Analyze macro-environmental factors",
    isAvailable: false
  },
  {
    id: 3,
    title: "Blue Ocean Strategy",
    description: "Develop uncontested market space",
    isAvailable: false
  },
  {
    id: 4,
    title: "Balanced Scorecard",
    description: "Strategic planning and management",
    isAvailable: false
  },
  {
    id: 5,
    title: "Porter's Five Forces",
    description: "Analyze competitive forces",
    isAvailable: false
  },
  {
    id: 6,
    title: "SWOT Analysis",
    description: "Evaluate strengths, weaknesses, opportunities, and threats",
    isAvailable: false
  }
]

export default function NewModelPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <span>New Model</span>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modelTypes.map((model) => {
            const CardWrapper = model.isAvailable ? Link : 'div'
            return (
              <CardWrapper
                key={model.id}
                href={model.href}
                className={model.isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{model.title}</CardTitle>
                      {!model.isAvailable && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Coming soon
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {model.description}
                    </p>
                  </CardContent>
                </Card>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </PageContainer>
  )
}

