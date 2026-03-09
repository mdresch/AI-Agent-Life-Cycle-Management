export type Department =
  | "HR"
  | "Marketing"
  | "Sales"
  | "Customer Service"
  | "IT"
  | "Finance"
  | "Operations"
  | "Legal"

export interface DepartmentSummary {
  department: Department
  agentCount: number
  percentage: number
  activeCount: number
  icon: string
  color: string
}

export interface BusinessAgent {
  id: string
  name: string
  department: Department
  division: string
  expertiseDomain: string
  isSpecialised: boolean
  status: "active" | "inactive"
  model: string
}

export interface KnowledgeDomain {
  domain: string
  agentCount: number
  topDepartments: Department[]
}

export const businessAgents: BusinessAgent[] = [
  // HR (4 records)
  {
    id: "ba-001",
    name: "Recruitment Assistant",
    department: "HR",
    division: "North America",
    expertiseDomain: "HR Policies",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-002",
    name: "Employee Onboarding Guide",
    department: "HR",
    division: "Global",
    expertiseDomain: "HR Policies",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-003",
    name: "Performance Review Assistant",
    department: "HR",
    division: "EMEA",
    expertiseDomain: "Data Analysis",
    isSpecialised: false,
    status: "active",
    model: "gpt-3.5-turbo",
  },
  {
    id: "ba-004",
    name: "Benefits Advisor",
    department: "HR",
    division: "APAC",
    expertiseDomain: "HR Policies",
    isSpecialised: true,
    status: "inactive",
    model: "gpt-4o-mini",
  },
  // Marketing (3 records)
  {
    id: "ba-005",
    name: "Content Creator",
    department: "Marketing",
    division: "North America",
    expertiseDomain: "Marketing Analytics",
    isSpecialised: true,
    status: "active",
    model: "claude-3-opus",
  },
  {
    id: "ba-006",
    name: "Campaign Analyzer",
    department: "Marketing",
    division: "EMEA",
    expertiseDomain: "Marketing Analytics",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-007",
    name: "SEO Optimizer",
    department: "Marketing",
    division: "Global",
    expertiseDomain: "Marketing Analytics",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  // Sales (3 records)
  {
    id: "ba-008",
    name: "Lead Qualifier",
    department: "Sales",
    division: "North America",
    expertiseDomain: "Sales Strategy",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-009",
    name: "Deal Coach",
    department: "Sales",
    division: "EMEA",
    expertiseDomain: "Sales Strategy",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-010",
    name: "Sales Forecasting Analyst",
    department: "Sales",
    division: "APAC",
    expertiseDomain: "Data Analysis",
    isSpecialised: false,
    status: "inactive",
    model: "gpt-3.5-turbo",
  },
  // Customer Service (3 records)
  {
    id: "ba-011",
    name: "Customer Support Assistant",
    department: "Customer Service",
    division: "Global",
    expertiseDomain: "Customer Data",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-012",
    name: "Returns & Refunds Processor",
    department: "Customer Service",
    division: "North America",
    expertiseDomain: "Customer Data",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o-mini",
  },
  {
    id: "ba-013",
    name: "Customer Feedback Analyzer",
    department: "Customer Service",
    division: "EMEA",
    expertiseDomain: "Customer Data",
    isSpecialised: true,
    status: "active",
    model: "claude-3-sonnet",
  },
  // IT (3 records)
  {
    id: "ba-014",
    name: "IT Service Desk Assistant",
    department: "IT",
    division: "Global",
    expertiseDomain: "IT Systems",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-015",
    name: "System Monitoring Alert",
    department: "IT",
    division: "North America",
    expertiseDomain: "IT Systems",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-016",
    name: "Code Review Assistant",
    department: "IT",
    division: "APAC",
    expertiseDomain: "IT Systems",
    isSpecialised: true,
    status: "active",
    model: "claude-3-opus",
  },
  // Finance (3 records)
  {
    id: "ba-017",
    name: "Expense Analyzer",
    department: "Finance",
    division: "North America",
    expertiseDomain: "Financial Compliance",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-018",
    name: "Invoice Processor",
    department: "Finance",
    division: "EMEA",
    expertiseDomain: "Financial Compliance",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o-mini",
  },
  {
    id: "ba-019",
    name: "Budget Planner",
    department: "Finance",
    division: "Global",
    expertiseDomain: "Financial Compliance",
    isSpecialised: false,
    status: "inactive",
    model: "gpt-3.5-turbo",
  },
  // Operations (3 records)
  {
    id: "ba-020",
    name: "Supply Chain Optimizer",
    department: "Operations",
    division: "Global",
    expertiseDomain: "Operations Management",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-021",
    name: "Process Automation Agent",
    department: "Operations",
    division: "APAC",
    expertiseDomain: "Operations Management",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-022",
    name: "Logistics Coordinator",
    department: "Operations",
    division: "EMEA",
    expertiseDomain: "Operations Management",
    isSpecialised: false,
    status: "inactive",
    model: "gpt-3.5-turbo",
  },
  // Legal (2 records)
  {
    id: "ba-023",
    name: "Contract Review Agent",
    department: "Legal",
    division: "North America",
    expertiseDomain: "Legal Research",
    isSpecialised: true,
    status: "active",
    model: "gpt-4o",
  },
  {
    id: "ba-024",
    name: "Compliance Monitor",
    department: "Legal",
    division: "Global",
    expertiseDomain: "Legal Research",
    isSpecialised: true,
    status: "active",
    model: "claude-3-sonnet",
  },
]

// Static presentation metadata per department (icon + colour only)
const DEPARTMENT_META: Record<Department, { icon: string; color: string }> = {
  HR: { icon: "Users", color: "hsl(var(--chart-1))" },
  Marketing: { icon: "Megaphone", color: "hsl(var(--chart-2))" },
  Sales: { icon: "TrendingUp", color: "hsl(var(--chart-3))" },
  "Customer Service": { icon: "HeadphonesIcon", color: "hsl(var(--chart-4))" },
  IT: { icon: "Monitor", color: "hsl(var(--chart-5))" },
  Finance: { icon: "DollarSign", color: "hsl(var(--chart-1))" },
  Operations: { icon: "Settings2", color: "hsl(var(--chart-2))" },
  Legal: { icon: "Scale", color: "hsl(var(--chart-3))" },
}

// Derived from businessAgents — single source of truth
export const departmentSummaries: DepartmentSummary[] = (
  Object.keys(DEPARTMENT_META) as Department[]
).map((dept) => {
  const deptAgents = businessAgents.filter((a) => a.department === dept)
  const agentCount = deptAgents.length
  const activeCount = deptAgents.filter((a) => a.status === "active").length
  return {
    department: dept,
    agentCount,
    percentage:
      businessAgents.length === 0 ? 0 : Math.round((agentCount / businessAgents.length) * 100),
    activeCount,
    ...DEPARTMENT_META[dept],
  }
})

export const knowledgeDomains: KnowledgeDomain[] = [
  {
    domain: "Customer Data",
    agentCount: 12,
    topDepartments: ["Customer Service", "Sales", "Marketing"],
  },
  {
    domain: "IT Systems",
    agentCount: 11,
    topDepartments: ["IT", "Operations"],
  },
  {
    domain: "Product Knowledge",
    agentCount: 10,
    topDepartments: ["Sales", "Marketing", "Customer Service"],
  },
  {
    domain: "Marketing Analytics",
    agentCount: 9,
    topDepartments: ["Marketing", "Sales"],
  },
  {
    domain: "Financial Compliance",
    agentCount: 8,
    topDepartments: ["Finance", "Legal"],
  },
  {
    domain: "HR Policies",
    agentCount: 7,
    topDepartments: ["HR", "Legal"],
  },
  {
    domain: "Sales Strategy",
    agentCount: 6,
    topDepartments: ["Sales", "Marketing"],
  },
  {
    domain: "Operations Management",
    agentCount: 5,
    topDepartments: ["Operations", "IT"],
  },
  {
    domain: "Data Analysis",
    agentCount: 4,
    topDepartments: ["IT", "Finance", "Marketing"],
  },
  {
    domain: "Legal Research",
    agentCount: 3,
    topDepartments: ["Legal", "HR"],
  },
]
