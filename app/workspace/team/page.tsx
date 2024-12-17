"use client"

import { useState } from "react"
import { PageContainer } from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

const initialTeamMembers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [removeMemberId, setRemoveMemberId] = useState<number | null>(null)
  const [removeConfirmation, setRemoveConfirmation] = useState("")

  const handleInvite = () => {
    if (newMemberEmail) {
      setTeamMembers([...teamMembers, { id: Date.now(), name: "", email: newMemberEmail }])
      setNewMemberEmail("")
    }
  }

  const handleRemove = (id: number) => {
    setRemoveMemberId(id)
  }

  const confirmRemove = () => {
    if (removeConfirmation === "DELETE" && removeMemberId) {
      setTeamMembers(teamMembers.filter(member => member.id !== removeMemberId))
      setRemoveMemberId(null)
      setRemoveConfirmation("")
    }
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <span>Team</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {teamMembers.length} team members
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you'd like to invite to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="member@example.com"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleInvite} className="bg-blue-600 hover:bg-blue-700 text-white">Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead className="w-[300px]">Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleRemove(member.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={removeMemberId !== null} onOpenChange={(open) => !open && setRemoveMemberId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Removal</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this team member? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="removeConfirmation" className="text-right">
                  Confirm
                </Label>
                <Input
                  id="removeConfirmation"
                  className="col-span-3"
                  value={removeConfirmation}
                  onChange={(e) => setRemoveConfirmation(e.target.value)}
                  placeholder="Type DELETE to confirm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemoveMemberId(null)}>Cancel</Button>
              <Button 
                onClick={confirmRemove}
                disabled={removeConfirmation !== "DELETE"}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  )
}

