import type { Metadata } from "next"
import { DevModeBanner } from "@/components/dev-mode-banner"

export const metadata: Metadata = {
  title: "Profile | AI Agents Platform",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <DevModeBanner message="Profile page: Normally requires authentication" />

      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Rest of the profile page content */}
    </div>
  )
}

