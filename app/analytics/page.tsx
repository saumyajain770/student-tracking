"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Calendar, FileText, Target, Download, Filter } from "lucide-react"

// Mock analytics data - in real app this would come from database
const conversionData = [
  { month: "Jan", interested: 45, applied: 12, enrolled: 8 },
  { month: "Feb", interested: 52, applied: 15, enrolled: 10 },
  { month: "Mar", interested: 38, applied: 18, enrolled: 12 },
  { month: "Apr", interested: 61, applied: 22, enrolled: 15 },
  { month: "May", interested: 49, applied: 19, enrolled: 11 },
  { month: "Jun", interested: 55, applied: 25, enrolled: 18 },
]

const eventPerformanceData = [
  { name: "Open House", registered: 185, attended: 162, applied: 35, enrolled: 22 },
  { name: "Workshop", registered: 78, attended: 71, applied: 18, enrolled: 12 },
  { name: "Career Fair", registered: 220, attended: 195, applied: 28, enrolled: 15 },
  { name: "Info Session", registered: 95, attended: 87, applied: 22, enrolled: 14 },
]

const sourceData = [
  { name: "Website", value: 35, color: "#3b82f6" },
  { name: "Referral", value: 28, color: "#10b981" },
  { name: "Social Media", value: 22, color: "#f59e0b" },
  { name: "Events", value: 15, color: "#8b5cf6" },
]

const applicationTrendData = [
  { week: "Week 1", submitted: 8, reviewed: 5, decided: 3 },
  { week: "Week 2", submitted: 12, reviewed: 10, decided: 7 },
  { week: "Week 3", submitted: 15, reviewed: 12, decided: 9 },
  { week: "Week 4", submitted: 10, reviewed: 14, decided: 11 },
]

const monthlyMetrics = {
  totalStudents: 1234,
  totalStudentsChange: 12,
  conversionRate: 24.5,
  conversionRateChange: 2.1,
  eventAttendance: 89,
  eventAttendanceChange: -3,
  applicationRate: 18.2,
  applicationRateChange: 5.4,
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track performance metrics and conversion analytics</p>
            </div>
            <div className="flex space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyMetrics.totalStudents.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getChangeIcon(monthlyMetrics.totalStudentsChange)}
                <span className={getChangeColor(monthlyMetrics.totalStudentsChange)}>
                  {Math.abs(monthlyMetrics.totalStudentsChange)}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyMetrics.conversionRate}%</div>
              <div className="flex items-center space-x-1 text-xs">
                {getChangeIcon(monthlyMetrics.conversionRateChange)}
                <span className={getChangeColor(monthlyMetrics.conversionRateChange)}>
                  {Math.abs(monthlyMetrics.conversionRateChange)}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyMetrics.eventAttendance}%</div>
              <div className="flex items-center space-x-1 text-xs">
                {getChangeIcon(monthlyMetrics.eventAttendanceChange)}
                <span className={getChangeColor(monthlyMetrics.eventAttendanceChange)}>
                  {Math.abs(monthlyMetrics.eventAttendanceChange)}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Application Rate</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyMetrics.applicationRate}%</div>
              <div className="flex items-center space-x-1 text-xs">
                {getChangeIcon(monthlyMetrics.applicationRateChange)}
                <span className={getChangeColor(monthlyMetrics.applicationRateChange)}>
                  {Math.abs(monthlyMetrics.applicationRateChange)}% from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="conversion" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="events">Event Performance</TabsTrigger>
            <TabsTrigger value="sources">Lead Sources</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="conversion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Journey Conversion</CardTitle>
                  <CardDescription>Track students through the enrollment pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="interested"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="applied"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="enrolled"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Current month conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">Interested</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">55</div>
                        <div className="text-xs text-muted-foreground">100%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-sm">Applied</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">25</div>
                        <div className="text-xs text-muted-foreground">45%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Enrolled</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">18</div>
                        <div className="text-xs text-muted-foreground">33%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Conversion Trends</CardTitle>
                <CardDescription>Track conversion rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="interested" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="applied" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="enrolled" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Performance Comparison</CardTitle>
                <CardDescription>Registration, attendance, and conversion by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={eventPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="registered" fill="#3b82f6" name="Registered" />
                    <Bar dataKey="attended" fill="#10b981" name="Attended" />
                    <Bar dataKey="applied" fill="#f59e0b" name="Applied" />
                    <Bar dataKey="enrolled" fill="#8b5cf6" name="Enrolled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Average Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87.5%</div>
                  <p className="text-sm text-muted-foreground">Across all events</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event to Application Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">19.2%</div>
                  <p className="text-sm text-muted-foreground">Attendees who apply</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event to Enrollment Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">11.8%</div>
                  <p className="text-sm text-muted-foreground">Attendees who enroll</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources Distribution</CardTitle>
                  <CardDescription>Where students are finding us</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {sourceData.map((entry) => (
                      <div key={entry.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-sm">
                          {entry.name}: {entry.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Performance</CardTitle>
                  <CardDescription>Conversion rates by source</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Website</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Referral</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social Media</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Events</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Processing Timeline</CardTitle>
                <CardDescription>Weekly application flow and processing</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submitted" fill="#3b82f6" name="Submitted" />
                    <Bar dataKey="reviewed" fill="#f59e0b" name="Reviewed" />
                    <Bar dataKey="decided" fill="#10b981" name="Decided" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acceptance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">72%</div>
                  <p className="text-sm text-muted-foreground">Of reviewed applications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Review Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5.2</div>
                  <p className="text-sm text-muted-foreground">Days per application</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">23</div>
                  <p className="text-sm text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">89%</div>
                  <p className="text-sm text-muted-foreground">Of accepted students</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
