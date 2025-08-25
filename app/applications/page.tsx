"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, FileText, Eye, Edit, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const mockApplications = [
  {
    id: 1,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@email.com",
    program: "Computer Science",
    applicationDate: "2024-01-22",
    status: "under_review",
    priority: "high",
    reviewerNotes: "Strong technical background, excellent portfolio",
    decisionDate: null,
    documents: ["transcript", "portfolio", "essay"],
  },
  {
    id: 2,
    studentId: 3,
    studentName: "Mike Johnson",
    studentEmail: "mike.johnson@email.com",
    program: "Web Development",
    applicationDate: "2024-01-18",
    status: "accepted",
    priority: "medium",
    reviewerNotes: "Great practical experience, good fit for program",
    decisionDate: "2024-01-28",
    documents: ["transcript", "portfolio"],
  },
  {
    id: 3,
    studentId: 5,
    studentName: "David Brown",
    studentEmail: "david.brown@email.com",
    program: "Data Science",
    applicationDate: "2024-01-25",
    status: "submitted",
    priority: "medium",
    reviewerNotes: "",
    decisionDate: null,
    documents: ["transcript", "essay"],
  },
  {
    id: 4,
    studentId: 6,
    studentName: "Lisa Davis",
    studentEmail: "lisa.davis@email.com",
    program: "Computer Science",
    applicationDate: "2024-01-20",
    status: "accepted",
    priority: "high",
    reviewerNotes: "Exceptional academic record, strong recommendations",
    decisionDate: "2024-01-30",
    documents: ["transcript", "portfolio", "essay", "recommendations"],
  },
  {
    id: 5,
    studentId: 7,
    studentName: "Tom Wilson",
    studentEmail: "tom.wilson@email.com",
    program: "Web Development",
    applicationDate: "2024-01-15",
    status: "rejected",
    priority: "low",
    reviewerNotes: "Did not meet technical requirements",
    decisionDate: "2024-01-25",
    documents: ["transcript"],
  },
]

const statusColors = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  waitlisted: "bg-purple-100 text-purple-800",
}

const statusIcons = {
  submitted: Clock,
  under_review: AlertCircle,
  accepted: CheckCircle,
  rejected: XCircle,
  waitlisted: Clock,
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesProgram = programFilter === "all" || app.program === programFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesProgram && matchesPriority
  })

  const getStatusBadge = (status) => {
    const IconComponent = statusIcons[status]
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        <IconComponent className="mr-1 h-3 w-3" />
        {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    return (
      <Badge variant="outline" className={priorityColors[priority] || "bg-gray-100 text-gray-800"}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  const totalApplications = applications.length
  const pendingReview = applications.filter((a) => a.status === "submitted" || a.status === "under_review").length
  const acceptedApplications = applications.filter((a) => a.status === "accepted").length
  const acceptanceRate = totalApplications > 0 ? Math.round((acceptedApplications / totalApplications) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Application Tracking</h1>
              <p className="text-muted-foreground">Review and manage student applications</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <FileText className="mr-2 h-4 w-4" />
              Export Applications
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReview}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedApplications}</div>
              <p className="text-xs text-muted-foreground">This cycle</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptanceRate}%</div>
              <p className="text-xs text-muted-foreground">Current cycle</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Directory</CardTitle>
            <CardDescription>Search and filter applications by status, program, and priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name, email, or program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Decision Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.studentName}</div>
                        <div className="text-sm text-muted-foreground">{application.studentEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{application.program}</TableCell>
                    <TableCell>{new Date(application.applicationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{getPriorityBadge(application.priority)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {application.documents.map((doc) => (
                          <Badge key={doc} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.decisionDate ? new Date(application.decisionDate).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/applications/${application.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No applications found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
