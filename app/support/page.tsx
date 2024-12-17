import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const issueTypes = [
  "General Inquiry",
  "Technical Support",
  "Billing Issue",
  "Feature Request",
  "Bug Report",
]

export default function SupportPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/workspace/dashboard" className="hover:text-foreground">
            Workspace
          </Link>
          <span>/</span>
          <span>Support</span>
        </div>

        <div className="max-w-2xl space-y-8">
          <form className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="issue-type" className="text-sm font-medium">
                Issue Type
              </label>
              <Select>
                <SelectTrigger id="issue-type">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea 
                id="message" 
                placeholder="How can we help you?" 
                rows={8}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  )
}

