"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Edit, Calendar, MapPin, UserCheck, UserX, Download, Mail } from "lucide-react"
import Link from "next/link"

// Mock event data - in real app this would come from database
const mockEvent = {
  id: 1,
  name: "Spring Open House",
  description: "Campus tour and program information session for prospective students and their families",
  eventType: "open_house",
  eventDate: "2024-03-15",
  location: "Main Campus",
  capacity: 100,
  registeredCount: 85,
  attendedCount: 72,
  status: "completed",
  createdAt: "2024-02-01",
  registrations: [
    {
      id: 1,
      studentId: 1,
      studentName: "John Doe",
      studentEmail: "john.doe@email.com",
      registrationDate: "2024-02-15",
      attended: true,
      notes: "Interested in Computer Science program",
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Jane Smith",
      studentEmail: "jane.smith@email.com",
      registrationDate: "2024-02-18",
      attended: true,
      notes: "Asking about financial aid",
    },
    {
      id: 3,
      studentId: 4,
      studentName: "Sarah Williams",
      studentEmail: "sarah.williams@email.com",
      registrationDate: "2024-02-20",
      attended: false,
      notes: "Last minute cancellation",
    },
  ],
}

const statusColors = {
  planned: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState(mockEvent)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRegistrations, setSelectedRegistrations] = useState([])

  const getStatusBadge = (status) => {
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const attendanceRate = event.registeredCount > 0 ? Math.round((event.attendedCount / event.registeredCount) * 100) : 0
  const capacityRate = Math.round((event.registeredCount / event.capacity) * 100)

  const handleAttendanceToggle = (registrationId, attended) => {
    setEvent((prev) => ({
      ...prev,
      registrations: prev.registrations.map((reg) => (reg.id === registrationId ? { ...reg, attended } : reg)),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{event.name}</h1>
                <p className="text-muted-foreground">Event Details & Management</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>Update event information and settings</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input id="eventName" defaultValue={event.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea id="eventDescription" defaultValue={event.description} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input id="eventDate" type="date" defaultValue={event.eventDate} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={event.location} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" defaultValue={event.capacity} />
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
        {/* Event Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div>{getStatusBadge(event.status)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold">
                {event.registeredCount}/{event.capacity}
              </div>
              <div className="text-sm text-muted-foreground">{capacityRate}% capacity filled</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(capacityRate, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold">{event.attendedCount}</div>
              <div className="text-sm text-muted-foreground">{attendanceRate}% attendance rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">No-shows:</span>
                <span className="text-sm font-medium">{event.registeredCount - event.attendedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Show rate:</span>
                <span className="text-sm font-medium">{attendanceRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Capacity used:</span>
                <span className="text-sm font-medium">{capacityRate}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Event Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{event.description}</p>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Registrations</CardTitle>
                    <CardDescription>All students registered for this event</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Email All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Attended</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {event.registrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.studentName}</TableCell>
                        <TableCell>{registration.studentEmail}</TableCell>
                        <TableCell>{new Date(registration.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {registration.attended ? (
                            <Badge className="bg-green-100 text-green-800">
                              <UserCheck className="mr-1 h-3 w-3" />
                              Attended
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              <UserX className="mr-1 h-3 w-3" />
                              No Show
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{registration.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>Mark attendance for registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.registrations.map((registration) => (
                    <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={registration.attended}
                          onCheckedChange={(checked) => handleAttendanceToggle(registration.id, checked)}
                        />
                        <div>
                          <div className="font-medium">{registration.studentName}</div>
                          <div className="text-sm text-muted-foreground">{registration.studentEmail}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Registered: {new Date(registration.registrationDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Timeline</CardTitle>
                  <CardDescription>When students registered for this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center text-muted-foreground py-8">
                      Registration timeline chart would go here
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Metrics</CardTitle>
                  <CardDescription>Event impact on student journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Attendees who applied:</span>
                    <span className="text-sm font-medium">15 (21%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Attendees who enrolled:</span>
                    <span className="text-sm font-medium">8 (11%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Follow-up interactions:</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average time to apply:</span>
                    <span className="text-sm font-medium">12 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
