import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const modelTypes = [
  {
    id: 1,
    title: "Business Canvas Model",
    description: "Create a comprehensive business model canvas",
    href: "/model/add/business-canvas",
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
    <div className="space-y-6">
      <BreadcrumbNav
        items={[
          { title: "All Models", href: "/dashboard" },
          { title: "New Model", href: "/model/add" },
        ]}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modelTypes.map((model) => {
          const CardWrapper = model.isAvailable ? Link : 'div'
          return (
            <CardWrapper
              key={model.id}
              href={model.href}
              className={model.isAvailable ? "cursor-pointer" : "cursor-not-allowed"}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{model.title}</CardTitle>
                    {!model.isAvailable && (
                      <Badge>Coming soon</Badge>
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
  )
}

