"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2, Play } from "lucide-react"

export function ProjectTestingConfig({ data, updateData }) {
  const [testCases, setTestCases] = useState(data.testCases || [])
  const [activeTestCase, setActiveTestCase] = useState(null)
  const [showNewTestCaseForm, setShowNewTestCaseForm] = useState(false)
  const [newTestCase, setNewTestCase] = useState({
    name: "",
    description: "",
    inputs: [],
  })
  // Track if data has been modified to prevent infinite updates
  const [isDataModified, setIsDataModified] = useState(false)

  useEffect(() => {
    if (isDataModified) {
      updateData({ testCases })
      setIsDataModified(false)
    }
  }, [isDataModified, testCases]) // Removed updateData from dependencies

  const handleAddTestCase = () => {
    if (newTestCase.name && newTestCase.inputs.length > 0) {
      const testCaseWithId = {
        ...newTestCase,
        id: `test-case-${Date.now()}`,
      }

      setTestCases([...testCases, testCaseWithId])
      setNewTestCase({
        name: "",
        description: "",
        inputs: [],
      })
      setShowNewTestCaseForm(false)
      setIsDataModified(true)
    }
  }

  const handleAddTestInput = () => {
    setNewTestCase({
      ...newTestCase,
      inputs: [
        ...newTestCase.inputs,
        {
          id: `input-${Date.now()}`,
          userInput: "",
          expectedResponse: "",
          criteria: [],
        },
      ],
    })
  }

  const updateTestInput = (index, field, value) => {
    const updatedInputs = [...newTestCase.inputs]
    updatedInputs[index] = {
      ...updatedInputs[index],
      [field]: value,
    }

    setNewTestCase({
      ...newTestCase,
      inputs: updatedInputs,
    })
  }

  const addCriterion = (inputIndex) => {
    const updatedInputs = [...newTestCase.inputs]
    updatedInputs[inputIndex] = {
      ...updatedInputs[inputIndex],
      criteria: [
        ...updatedInputs[inputIndex].criteria,
        {
          id: `criterion-${Date.now()}`,
          text: "",
          checked: true,
        },
      ],
    }

    setNewTestCase({
      ...newTestCase,
      inputs: updatedInputs,
    })
  }

  const updateCriterion = (inputIndex, criterionIndex, field, value) => {
    const updatedInputs = [...newTestCase.inputs]
    const updatedCriteria = [...updatedInputs[inputIndex].criteria]

    updatedCriteria[criterionIndex] = {
      ...updatedCriteria[criterionIndex],
      [field]: value,
    }

    updatedInputs[inputIndex] = {
      ...updatedInputs[inputIndex],
      criteria: updatedCriteria,
    }

    setNewTestCase({
      ...newTestCase,
      inputs: updatedInputs,
    })
  }

  const removeCriterion = (inputIndex, criterionIndex) => {
    const updatedInputs = [...newTestCase.inputs]
    updatedInputs[inputIndex] = {
      ...updatedInputs[inputIndex],
      criteria: updatedInputs[inputIndex].criteria.filter((_, i) => i !== criterionIndex),
    }

    setNewTestCase({
      ...newTestCase,
      inputs: updatedInputs,
    })
  }

  const removeTestInput = (index) => {
    setNewTestCase({
      ...newTestCase,
      inputs: newTestCase.inputs.filter((_, i) => i !== index),
    })
  }

  const removeTestCase = (id) => {
    setTestCases(testCases.filter((testCase) => testCase.id !== id))
    if (activeTestCase && activeTestCase.id === id) {
      setActiveTestCase(null)
    }
    setIsDataModified(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
          <CardDescription>Create and manage test cases for your agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Input placeholder="Search test cases..." className="max-w-sm" />
            <Button onClick={() => setShowNewTestCaseForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Test Case
            </Button>
          </div>

          {testCases.length === 0 && !showNewTestCaseForm ? (
            <div className="flex h-[200px] items-center justify-center rounded-md border">
              <p className="text-center text-muted-foreground">
                No test cases yet. Create your first test case to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {testCases.map((testCase) => (
                <div key={testCase.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{testCase.name}</h3>
                      <p className="text-sm text-muted-foreground">{testCase.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{testCase.inputs.length} test inputs</Badge>
                      <Button variant="outline" size="sm" onClick={() => setActiveTestCase(testCase)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Run
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeTestCase(testCase.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showNewTestCaseForm && (
            <div className="space-y-4 rounded-md border p-4">
              <h3 className="text-lg font-medium">New Test Case</h3>

              <div className="space-y-2">
                <Label htmlFor="test-name">Test Case Name</Label>
                <Input
                  id="test-name"
                  value={newTestCase.name}
                  onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
                  placeholder="E.g., Basic Product Questions"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-description">Description</Label>
                <Textarea
                  id="test-description"
                  value={newTestCase.description}
                  onChange={(e) => setNewTestCase({ ...newTestCase, description: e.target.value })}
                  placeholder="Describe what this test case is testing"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Test Inputs</Label>
                  <Button variant="outline" size="sm" onClick={handleAddTestInput}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Input
                  </Button>
                </div>

                {newTestCase.inputs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No test inputs added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {newTestCase.inputs.map((input, index) => (
                      <div key={input.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Test Input #{index + 1}</h4>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => removeTestInput(index)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor={`test-input-${index}`} className="text-xs">
                            User Input
                          </Label>
                          <Textarea
                            id={`test-input-${index}`}
                            className="min-h-[80px]"
                            value={input.userInput}
                            onChange={(e) => updateTestInput(index, "userInput", e.target.value)}
                            placeholder="Enter what the user would say to the agent"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor={`test-expected-${index}`} className="text-xs">
                            Expected Response (Optional)
                          </Label>
                          <Textarea
                            id={`test-expected-${index}`}
                            className="min-h-[80px]"
                            value={input.expectedResponse}
                            onChange={(e) => updateTestInput(index, "expectedResponse", e.target.value)}
                            placeholder="Enter expected response or leave blank to manually evaluate"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Evaluation Criteria</Label>
                            <Button variant="outline" size="sm" onClick={() => addCriterion(index)}>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Criterion
                            </Button>
                          </div>
                          {input.criteria.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No criteria added yet.</p>
                          ) : (
                            <div className="space-y-2">
                              {input.criteria.map((criterion, criterionIndex) => (
                                <div key={criterion.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`criteria-${index}-${criterionIndex}`}
                                    checked={criterion.checked}
                                    onCheckedChange={(checked) =>
                                      updateCriterion(index, criterionIndex, "checked", checked)
                                    }
                                  />
                                  <Input
                                    value={criterion.text}
                                    onChange={(e) => updateCriterion(index, criterionIndex, "text", e.target.value)}
                                    placeholder="E.g., Must include pricing information"
                                    className="flex-1"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCriterion(index, criterionIndex)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewTestCaseForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTestCase} disabled={!newTestCase.name || newTestCase.inputs.length === 0}>
                  Add Test Case
                </Button>
              </div>
            </div>
          )}

          {activeTestCase && (
            <div className="space-y-4 rounded-md border p-4">
              <h3 className="text-lg font-medium">Edit Test Case: {activeTestCase.name}</h3>

              <div className="space-y-2">
                <Label>Test Case Details</Label>
                <div className="rounded-md border p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{activeTestCase.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Inputs</p>
                      <p className="text-sm text-muted-foreground">{activeTestCase.inputs.length} test inputs</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{activeTestCase.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveTestCase(null)}>
                  Close
                </Button>
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Run Test Case
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

