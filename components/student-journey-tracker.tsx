"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

interface JourneyStep {
  id: string
  label: string
  status: "completed" | "current" | "upcoming"
  date?: string
}

interface StudentJourneyTrackerProps {
  currentStatus: string
  className?: string
}

export function StudentJourneyTracker({ currentStatus, className }: StudentJourneyTrackerProps) {
  const journeySteps: JourneyStep[] = [
    {
      id: "interested",
      label: "Interested",
      status:
        currentStatus === "interested"
          ? "current"
          : ["applied", "enrolled"].includes(currentStatus)
            ? "completed"
            : "upcoming",
    },
    {
      id: "applied",
      label: "Applied",
      status: currentStatus === "applied" ? "current" : currentStatus === "enrolled" ? "completed" : "upcoming",
    },
    {
      id: "enrolled",
      label: "Enrolled",
      status: currentStatus === "enrolled" ? "completed" : "upcoming",
    },
  ]

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "current":
        return <Circle className="h-5 w-5 text-blue-600 fill-blue-600" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "current":
        return "text-blue-600 font-medium"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Student Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center space-y-2">
                {getStepIcon(step.status)}
                <span className={`text-sm ${getStepColor(step.status)}`}>{step.label}</span>
              </div>
              {index < journeySteps.length - 1 && <ArrowRight className="h-4 w-4 text-gray-300 mx-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
