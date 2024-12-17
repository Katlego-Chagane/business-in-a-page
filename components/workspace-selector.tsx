"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function WorkspaceSelector() {
  return (
    <Select defaultValue="personal">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="personal">Personal Workspace</SelectItem>
        <SelectItem value="team">Team Workspace</SelectItem>
        <SelectItem value="project">Project Workspace</SelectItem>
      </SelectContent>
    </Select>
  )
}

