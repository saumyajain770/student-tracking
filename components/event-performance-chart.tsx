"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const eventData = [
  { name: "Open House", registered: 85, attended: 72, applied: 15 },
  { name: "Workshop", registered: 28, attended: 25, applied: 8 },
  { name: "Career Fair", registered: 150, attended: 135, applied: 22 },
  { name: "Info Session", registered: 45, attended: 42, applied: 12 },
]

const attendanceData = [
  { name: "Attended", value: 274, color: "#10b981" },
  { name: "No Show", value: 34, color: "#ef4444" },
]

export function EventPerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Performance Comparison</CardTitle>
          <CardDescription>Registration vs attendance vs applications by event type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registered" fill="#3b82f6" name="Registered" />
              <Bar dataKey="attended" fill="#10b981" name="Attended" />
              <Bar dataKey="applied" fill="#f59e0b" name="Applied" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance Rate</CardTitle>
          <CardDescription>Attendance vs no-shows across all events</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {attendanceData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
