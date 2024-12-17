"use client"

import { useState } from "react"
import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    features: [
      "3 Business Models",
      "Basic Templates",
      "Export to PDF",
      "Email Support"
    ],
    current: true
  },
  {
    name: "Pro",
    description: "Best for professionals",
    price: "$15",
    features: [
      "Unlimited Business Models",
      "All Templates",
      "Priority Support",
      "Team Collaboration",
      "Custom Branding"
    ]
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Custom Templates",
      "Dedicated Support",
      "SSO Integration",
      "API Access"
    ]
  }
]

const transactions = [
  {
    id: "INV-001",
    date: "2023-12-01",
    amount: "$0",
    status: "Completed",
    plan: "Free"
  },
  {
    id: "INV-002",
    date: "2023-11-01",
    amount: "$0",
    status: "Completed",
    plan: "Free"
  }
]

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans.find(plan => plan.current)?.name || "")

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <span>Billing</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Select a plan that best suits your needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`cursor-pointer ${selectedPlan === plan.name ? "border-blue-600" : ""}`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{plan.price}</div>
                <p className="text-sm text-muted-foreground">per user/month</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="mr-2 h-4 w-4 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={selectedPlan === plan.name ? "w-full bg-blue-600 hover:bg-blue-700 text-white" : "w-full"}
                  variant={selectedPlan === plan.name ? "default" : "outline"}
                >
                  {selectedPlan === plan.name ? "Current Plan" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.plan}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

