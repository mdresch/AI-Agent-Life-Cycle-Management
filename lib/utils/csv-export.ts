/** Neutralise CSV/Excel formula injection by prefixing dangerous leading characters with a tab. */
function sanitizeCsvValue(str: string): string {
  const trimmed = str.trimStart()
  if (
    trimmed.startsWith("=") ||
    trimmed.startsWith("+") ||
    trimmed.startsWith("-") ||
    trimmed.startsWith("@")
  ) {
    return `\t${str}`
  }
  return str
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportToCsv(data: Record<string, any>[], filename: string): void {
  if (data.length === 0) return

  // Collect all unique keys across all rows to handle objects with differing shapes
  const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))))

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h]
          const raw = val === null || val === undefined ? "" : String(val)
          const str = sanitizeCsvValue(raw)
          return str.includes(",") || str.includes("\n") || str.includes('"')
            ? `"${str.replace(/"/g, '""')}"`
            : str
        })
        .join(",")
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
