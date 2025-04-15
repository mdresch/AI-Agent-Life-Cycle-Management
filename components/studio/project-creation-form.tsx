"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProjectBasicConfig } from "@/components/studio/project-basic-config"
import { ProjectPromptsConfig } from "@/components/studio/project-prompts-config"
import { ProjectToolsConfig } from "@/components/studio/project-tools-config"
import { ProjectKnowledgeConfig } from "@/components/studio/project-knowledge-config"
import { ProjectTestingConfig } from "@/components/studio/project-testing-config"
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ProjectCreationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentTab, setCurrentTab] = useState("basic")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [formData, setFormData] = useState({
    basic: {
      name: "",
      description: "",
      model: "gpt-4o",
      temperature: 0.7,
      maxTokens: 1024,
      isActive: true,
      systemPrompt: "",
    },
    prompts: {
      templates: [],
    },
    tools: {
      enabledTools: ["web-search", "knowledge-base"],
      customTools: [],
    },
    knowledge: {
      sources: [],
      retrievalStrategy: "semantic",
      chunkSize: 500,
      topK: 5,
      autoCitation: true,
      knowledgeFallback: true,
    },
    testing: {
      testCases: [],
    },
  })

  const tabs = [
    { id: "basic", label: "Basic Configuration" },
    { id: "prompts", label: "Prompts" },
    { id: "tools", label: "Tools" },
    { id: "knowledge", label: "Knowledge" },
    { id: "testing", label: "Testing" },
  ]

  const currentTabIndex = tabs.findIndex((tab) => tab.id === currentTab)

  const handleNext = () => {
    const nextIndex = currentTabIndex + 1
    if (nextIndex < tabs.length) {
      setCurrentTab(tabs[nextIndex].id)
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentTabIndex - 1
    if (prevIndex >= 0) {
      setCurrentTab(tabs[prevIndex].id)
    }
  }

  // Use a memoized update function to prevent infinite loops
  const updateFormData = (section, data) => {
    setFormData((prev) => {
      // Only update if data has actually changed
      if (JSON.stringify(prev[section]) === JSON.stringify(data)) {
        return prev
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          ...data,
        },
      }
    })
  }

  const handleSubmit = () => {
    // In a real application, this would send the data to an API
    console.log("Submitting project:", formData)

    // Show success toast
    toast({
      title: "Project created successfully",
      description: `${formData.basic.name} has been created and is ready to use.`,
    })

    // Redirect to the studio page
    router.push("/studio")
  }

  const isFormValid = () => {
    // Basic validation - at minimum, we need a name
    return formData.basic.name.trim().length > 0
  }

  return (
    <div className="space-y-6">
      <Card>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="basic" className="p-6">
            <ProjectBasicConfig data={formData.basic} updateData={(data) => updateFormData("basic", data)} />
          </TabsContent>

          <TabsContent value="prompts" className="p-6">
            <ProjectPromptsConfig data={formData.prompts} updateData={(data) => updateFormData("prompts", data)} />
          </TabsContent>

          <TabsContent value="tools" className="p-6">
            <ProjectToolsConfig data={formData.tools} updateData={(data) => updateFormData("tools", data)} />
          </TabsContent>

          <TabsContent value="knowledge" className="p-6">
            <ProjectKnowledgeConfig
              data={formData.knowledge}
              updateData={(data) => updateFormData("knowledge", data)}
            />
          </TabsContent>

          <TabsContent value="testing" className="p-6">
            <ProjectTestingConfig data={formData.testing} updateData={(data) => updateFormData("testing", data)} />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between border-t p-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentTabIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentTabIndex === tabs.length - 1 ? (
              <Button onClick={() => setShowConfirmDialog(true)} disabled={!isFormValid()}>
                <Rocket className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create this project? You can edit it later, but some settings may affect how the
              agent is initialized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Create Project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

