"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, Plus, RefreshCw, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "sk_prod_2023_XXXXXXXXXXXXXXXXXXXX",
      created: "Apr 23, 2023",
      lastUsed: "2 hours ago",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "sk_dev_2023_XXXXXXXXXXXXXXXXXXXX",
      created: "Jun 15, 2023",
      lastUsed: "5 days ago",
    },
  ])

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [newKeyName, setNewKeyName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newKey, setNewKey] = useState("")

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCreateKey = () => {
    // Simulate API key creation
    const generatedKey = `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
    setNewKey(generatedKey)

    const newKeyObj = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: generatedKey,
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUsed: "Never",
    }

    setApiKeys([...apiKeys, newKeyObj])
    setNewKeyName("")
    setIsDialogOpen(true)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage API keys to authenticate your applications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Input placeholder="API Key Name" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
          <Button onClick={handleCreateKey} disabled={!newKeyName}>
            <Plus className="mr-2 h-4 w-4" />
            Create Key
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-medium">{apiKey.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {showKeys[apiKey.id]
                        ? apiKey.key
                        : apiKey.key.replace(/^(sk_[^_]+_[^_]{4}).*$/, "$1••••••••••••••")}
                    </code>
                    <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                      {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showKeys[apiKey.id] ? "Hide API key" : "Show API key"}</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy API key</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{apiKey.created}</TableCell>
                <TableCell>{apiKey.lastUsed}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteKey(apiKey.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete API key</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          <Badge variant="outline" className="mr-2">
            Note
          </Badge>
          API keys provide full access to your account. Keep them secure!
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Keys
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Make sure to copy your API key now. You won't be able to see it again!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <Input value={newKey} readOnly />
              <Button variant="outline" size="icon" onClick={() => handleCopyKey(newKey)}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy API key</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

