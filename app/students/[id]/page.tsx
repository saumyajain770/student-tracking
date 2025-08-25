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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Phone, Mail, Calendar, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

// Mock student data - in real app this would come from database
const mockStudent = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "555-0101",
  status: "interested",
  source: "website",
  createdAt: "2024-01-15",
  lastInteraction: "2024-01-20",
  notes: "Interested in Computer Science program. Attended virtual info session.",
  interactions: [
    {
      id: 1,
      type: "email",
      date: "2024-01-20",
      description: "Sent program information and application details",
      outcome: "follow_up_needed",
      staffMember: "Sarah Johnson",
    },
    {
      id: 2,
      type: "phone",
      date: "2024-01-18",
      description: "Initial inquiry call about programs",
      outcome: "interested",
      staffMember: "Mike Davis",
    },
    {
      id: 3,
      type: "event",
      date: "2024-01-15",
      description: "Attended virtual information session",
      outcome: "very_interested",
      staffMember: "Lisa Wilson",
    },
  ],
  applications: [
    {
      id: 1,
      program: "Computer Science",
      status: "pending",
      submittedDate: "2024-01-22",
      notes: "Strong academic background in mathematics",
    },
  ],
  events: [
    {
      id: 1,
      name: "Virtual Information Session",
      date: "2024-01-15",
      attended: true,
    },
    {
      id: 2,
      name: "Spring Open House",
      date: "2024-03-15",
      registered: true,
      attended: false,
    },
  ],
}

const statusColors = {
  interested: "bg-blue-100 text-blue-800",
  applied: "bg-yellow-100 text-yellow-800",
  enrolled: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
}

const interactionIcons = {
  email: Mail,
  phone: Phone,
  meeting: Users,
  event: Calendar,
}

export default function StudentDetailPage() {
  const params = useParams()
  const [student, setStudent] = useState(mockStudent)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false)

  const getStatusBadge = (status) => {
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
              <Link href="/students">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Students
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-muted-foreground">Student Profile & Journey</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isInteractionDialogOpen} onOpenChange={setIsInteractionDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Log Interaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log New Interaction</DialogTitle>
                    <DialogDescription>
                      Record a new interaction with {student.firstName} {student.lastName}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="interactionType">Interaction Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="meeting">In-Person Meeting</SelectItem>
                          <SelectItem value="event">Event Attendance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="What was discussed or accomplished?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outcome">Outcome</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interested">Interested</SelectItem>
                          <SelectItem value="very_interested">Very Interested</SelectItem>
                          <SelectItem value="follow_up_needed">Follow-up Needed</SelectItem>
                          <SelectItem value="not_interested">Not Interested</SelectItem>
                          <SelectItem value="ready_to_apply">Ready to Apply</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsInteractionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsInteractionDialogOpen(false)}>Save Interaction</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Student Profile</DialogTitle>
                    <DialogDescription>Update {student.firstName}'s information and status</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={student.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={student.lastName} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={student.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={student.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={student.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interested">Interested</SelectItem>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="enrolled">Enrolled</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Student Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Added {new Date(student.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>{getStatusBadge(student.status)}</div>
              <div className="text-sm text-muted-foreground">
                Source: <span className="capitalize">{student.source.replace("_", " ")}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last contact: {new Date(student.lastInteraction).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Interactions:</span>
                <span className="text-sm font-medium">{student.interactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Applications:</span>
                <span className="text-sm font-medium">{student.applications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Events Attended:</span>
                <span className="text-sm font-medium">{student.events.filter((e) => e.attended).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="interactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle>Interaction History</CardTitle>
                <CardDescription>All interactions with this student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.interactions.map((interaction) => {
                    const IconComponent = interactionIcons[interaction.type] || MessageSquare
                    return (
                      <div key={interaction.id} className="flex space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium capitalize">{interaction.type}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(interaction.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{interaction.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {interaction.outcome.replace("_", " ")}
                            </Badge>
                            <span className="text-xs text-muted-foreground">by {interaction.staffMember}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Student's application history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.applications.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{application.program}</h4>
                        <Badge
                          className={
                            application.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">{application.notes}</p>
                    </div>
                  ))}
                  {student.applications.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No applications submitted yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Participation</CardTitle>
                <CardDescription>Events this student has registered for or attended</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        {event.registered && <Badge variant="outline">Registered</Badge>}
                        {event.attended && <Badge className="bg-green-100 text-green-800">Attended</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Additional information about this student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    defaultValue={student.notes}
                    placeholder="Add notes about this student..."
                    className="min-h-[200px]"
                  />
                  <Button>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
