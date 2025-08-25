"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface PipelineStage {
  id: string
  label: string
  count: number
  color: string
  icon: React.ComponentType<{ className?: string }>
}

interface ApplicationPipelineProps {
  className?: string
}

export function ApplicationPipeline({ className }: ApplicationPipelineProps) {
  const pipelineStages: PipelineStage[] = [
    {
      id: "submitted",
      label: "Submitted",
      count: 12,
      color: "bg-blue-100 text-blue-800",
      icon: Clock,
    },
    {
      id: "under_review",
      label: "Under Review",
      count: 8,
      color: "bg-yellow-100 text-yellow-800",
      icon: AlertCircle,
    },
    {
      id: "accepted",
      label: "Accepted",
      count: 15,
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: 3,
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Application Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => {
            const IconComponent = stage.icon
            return (
              <div key={stage.id} className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 rounded-full bg-muted">
                    <IconComponent className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{stage.count}</div>
                  <Badge className={stage.color}>{stage.label}</Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
