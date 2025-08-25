"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText, Download, MessageSquare, CheckCircle, User } from "lucide-react"
import Link from "next/link"

// Mock application data - in real app this would come from database
const mockApplication = {
  id: 1,
  studentId: 2,
  studentName: "Jane Smith",
  studentEmail: "jane.smith@email.com",
  studentPhone: "555-0102",
  program: "Computer Science",
  applicationDate: "2024-01-22",
  status: "under_review",
  priority: "high",
  reviewerNotes: "Strong technical background, excellent portfolio. Needs final interview.",
  decisionDate: null,
  documents: [
    { name: "transcript", uploaded: true, url: "#" },
    { name: "portfolio", uploaded: true, url: "#" },
    { name: "essay", uploaded: true, url: "#" },
    { name: "recommendations", uploaded: false, url: null },
  ],
  timeline: [
    {
      id: 1,
      action: "Application Submitted",
      date: "2024-01-22",
      user: "System",
      notes: "Complete application received",
    },
    {
      id: 2,
      action: "Initial Review",
      date: "2024-01-24",
      user: "Sarah Johnson",
      notes: "Documents verified, moving to technical review",
    },
    {
      id: 3,
      action: "Technical Review",
      date: "2024-01-26",
      user: "Mike Davis",
      notes: "Portfolio review completed. Strong technical skills demonstrated.",
    },
  ],
  studentInfo: {
    previousEducation: "Bachelor's in Mathematics",
    workExperience: "2 years as Junior Developer",
    interests: "Machine Learning, Web Development",
    source: "referral",
  },
}

const statusColors = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  waitlisted: "bg-purple-100 text-purple-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const [application, setApplication] = useState(mockApplication)
  const [isDecisionDialogOpen, setIsDecisionDialogOpen] = useState(false)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)

  const getStatusBadge = (status) => {
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    return (
      <Badge variant="outline" className={priorityColors[priority] || "bg-gray-100 text-gray-800"}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/applications">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Applications
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {application.studentName} - {application.program}
                </h1>
                <p className="text-muted-foreground">Application Review & Decision</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Notes
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Review Notes</DialogTitle>
                    <DialogDescription>Add notes about this application review</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Enter your review notes..." className="min-h-[100px]" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsNotesDialogOpen(false)}>Save Notes</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isDecisionDialogOpen} onOpenChange={setIsDecisionDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Make Decision
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Application Decision</DialogTitle>
                    <DialogDescription>Make a decision on {application.studentName}'s application</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="decision">Decision</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select decision" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accepted">Accept</SelectItem>
                          <SelectItem value="rejected">Reject</SelectItem>
                          <SelectItem value="waitlisted">Waitlist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="decisionNotes">Decision Notes</Label>
                      <Textarea id="decisionNotes" placeholder="Reason for decision..." />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDecisionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDecisionDialogOpen(false)}>Submit Decision</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Application Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>{getStatusBadge(application.status)}</div>
              <div>{getPriorityBadge(application.priority)}</div>
              <div className="text-sm text-muted-foreground">
                Submitted: {new Date(application.applicationDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{application.studentName}</span>
              </div>
              <div className="text-sm text-muted-foreground">{application.studentEmail}</div>
              <div className="text-sm text-muted-foreground">{application.studentPhone}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-medium">{application.program}</div>
              <div className="text-sm text-muted-foreground">Full-time program</div>
              <div className="text-sm text-muted-foreground">Start: Fall 2024</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {application.documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{doc.name}</span>
                  {doc.uploaded ? (
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Missing</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="review" className="space-y-6">
          <TabsList>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="student">Student Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Application Review</CardTitle>
                <CardDescription>Review notes and assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Current Review Notes</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{application.reviewerNotes || "No review notes yet."}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Assessment Checklist</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Academic Requirements Met</span>
                      <Badge className="bg-green-100 text-green-800">✓ Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Portfolio Review</span>
                      <Badge className="bg-green-100 text-green-800">✓ Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Technical Assessment</span>
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Interview</span>
                      <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Application Documents</CardTitle>
                <CardDescription>All submitted documents and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium capitalize">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.uploaded ? "Uploaded" : "Not submitted"}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {doc.uploaded ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                          </>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Missing</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
                <CardDescription>History of actions and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.timeline.map((event, index) => (
                    <div key={event.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        {index < application.timeline.length - 1 && <div className="w-px h-8 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{event.action}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{event.notes}</p>
                        <p className="text-xs text-muted-foreground">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Background</CardTitle>
                <CardDescription>Additional information about the applicant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Educational Background</h4>
                  <p className="text-sm text-muted-foreground">{application.studentInfo.previousEducation}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Work Experience</h4>
                  <p className="text-sm text-muted-foreground">{application.studentInfo.workExperience}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Areas of Interest</h4>
                  <p className="text-sm text-muted-foreground">{application.studentInfo.interests}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How They Found Us</h4>
                  <Badge variant="outline" className="capitalize">
                    {application.studentInfo.source.replace("_", " ")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
