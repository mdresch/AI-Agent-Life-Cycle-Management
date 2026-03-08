"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportToCsv } from "@/lib/utils/csv-export"

interface ExportButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[]
  filename: string
  label?: string
}

export function ExportButton({ data, filename, label = "Export CSV" }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => exportToCsv(data, filename)}
    >
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
