export interface StudioProject {
  id: string
  name: string
  agentId: string
  agentName: string
  systemPrompt: string
  status: "active" | "draft" | "archived"
  lastEditedAt: string
  createdAt: string
  createdBy: string
}

export interface TrainingSession {
  id: string
  projectId: string
  agentId: string
  scenario: string
  score: number
  steps: TrainingStep[]
  completedAt: string
}

export interface TrainingStep {
  id: string
  description: string
  result: "pass" | "fail" | "skip"
  score: number
  details?: string
}

export interface PromptTemplate {
  id: string
  name: string
  content: string
  tags: string[]
  createdAt: string
  createdBy: string
}

export const TRAINING_SCENARIOS = [
  { id: "customer-service-basic", label: "Customer Service — Basic Queries" },
  { id: "customer-service-escalation", label: "Customer Service — Escalation Handling" },
  { id: "data-analysis", label: "Data Analysis & Summarisation" },
  { id: "code-review", label: "Code Review & Suggestions" },
  { id: "document-qa", label: "Document Q&A" },
  { id: "creative-writing", label: "Creative Writing" },
] as const

export const studioProjects: StudioProject[] = [
  {
    id: "proj-001",
    name: "Customer Support Agent v2",
    agentId: "agent-cs-01",
    agentName: "Customer Support Agent",
    systemPrompt:
      "You are a professional customer support agent. Your goal is to resolve customer issues efficiently and empathetically.",
    status: "active",
    lastEditedAt: "2024-03-14T10:30:00Z",
    createdAt: "2024-01-10T09:00:00Z",
    createdBy: "alice@example.com",
  },
  {
    id: "proj-002",
    name: "Data Analysis Pipeline",
    agentId: "agent-da-01",
    agentName: "Data Analysis Agent",
    systemPrompt:
      "You are an expert data analyst. Analyse datasets, identify trends, and provide actionable insights with clear visualisations.",
    status: "active",
    lastEditedAt: "2024-03-13T14:20:00Z",
    createdAt: "2024-01-20T11:00:00Z",
    createdBy: "bob@example.com",
  },
  {
    id: "proj-003",
    name: "Content Generator Pro",
    agentId: "agent-cg-01",
    agentName: "Content Generator",
    systemPrompt:
      "You are a creative content strategist. Produce engaging marketing copy, blog posts, and social media content aligned with brand voice.",
    status: "active",
    lastEditedAt: "2024-03-12T08:45:00Z",
    createdAt: "2024-02-01T10:00:00Z",
    createdBy: "carol@example.com",
  },
  {
    id: "proj-004",
    name: "Code Review Assistant",
    agentId: "agent-cr-01",
    agentName: "Code Review Agent",
    systemPrompt:
      "You are a senior software engineer performing code reviews. Identify bugs, suggest improvements, and ensure best practices.",
    status: "draft",
    lastEditedAt: "2024-03-10T16:00:00Z",
    createdAt: "2024-02-15T12:00:00Z",
    createdBy: "dave@example.com",
  },
  {
    id: "proj-005",
    name: "Legacy Support Bot",
    agentId: "agent-ls-01",
    agentName: "Customer Support Agent",
    systemPrompt: "You are a support agent for legacy product versions. Provide guidance based on older documentation.",
    status: "archived",
    lastEditedAt: "2024-01-05T09:00:00Z",
    createdAt: "2023-10-01T08:00:00Z",
    createdBy: "alice@example.com",
  },
]

export const trainingSessions: TrainingSession[] = [
  {
    id: "ts-001",
    projectId: "proj-001",
    agentId: "agent-cs-01",
    scenario: "customer-service-basic",
    score: 88,
    completedAt: "2024-03-14T09:00:00Z",
    steps: [
      { id: "s1", description: "Greet customer appropriately", result: "pass", score: 95 },
      { id: "s2", description: "Identify and acknowledge the issue", result: "pass", score: 90 },
      { id: "s3", description: "Provide accurate product information", result: "pass", score: 85 },
      { id: "s4", description: "Offer a clear resolution path", result: "pass", score: 88 },
      { id: "s5", description: "Confirm resolution and close politely", result: "pass", score: 92 },
    ],
  },
  {
    id: "ts-002",
    projectId: "proj-001",
    agentId: "agent-cs-01",
    scenario: "customer-service-escalation",
    score: 72,
    completedAt: "2024-03-13T14:00:00Z",
    steps: [
      { id: "s1", description: "Detect escalation signals in user message", result: "pass", score: 80 },
      { id: "s2", description: "De-escalate tone appropriately", result: "fail", score: 50, details: "Response was too formal for the emotional context" },
      { id: "s3", description: "Offer supervisor escalation option", result: "pass", score: 88 },
      { id: "s4", description: "Document issue for handoff", result: "pass", score: 75 },
      { id: "s5", description: "Maintain professionalism throughout", result: "pass", score: 82 },
      { id: "s6", description: "Follow escalation SLA guidelines", result: "skip", score: 0 },
    ],
  },
  {
    id: "ts-003",
    projectId: "proj-001",
    agentId: "agent-cs-01",
    scenario: "document-qa",
    score: 82,
    completedAt: "2024-03-12T11:30:00Z",
    steps: [
      { id: "s1", description: "Parse document context correctly", result: "pass", score: 90 },
      { id: "s2", description: "Answer factual question from document", result: "pass", score: 88 },
      { id: "s3", description: "Handle out-of-scope question gracefully", result: "pass", score: 78 },
      { id: "s4", description: "Cite relevant document sections", result: "fail", score: 55, details: "Citations were imprecise" },
      { id: "s5", description: "Summarise key points on request", result: "pass", score: 85 },
    ],
  },
  {
    id: "ts-004",
    projectId: "proj-002",
    agentId: "agent-da-01",
    scenario: "data-analysis",
    score: 95,
    completedAt: "2024-03-14T08:00:00Z",
    steps: [
      { id: "s1", description: "Load and inspect dataset schema", result: "pass", score: 98 },
      { id: "s2", description: "Identify missing values and anomalies", result: "pass", score: 95 },
      { id: "s3", description: "Generate descriptive statistics", result: "pass", score: 97 },
      { id: "s4", description: "Produce trend analysis narrative", result: "pass", score: 93 },
      { id: "s5", description: "Suggest next steps for investigation", result: "pass", score: 94 },
      { id: "s6", description: "Format output for non-technical audience", result: "pass", score: 92 },
    ],
  },
  {
    id: "ts-005",
    projectId: "proj-002",
    agentId: "agent-da-01",
    scenario: "document-qa",
    score: 78,
    completedAt: "2024-03-11T15:00:00Z",
    steps: [
      { id: "s1", description: "Extract relevant data from report", result: "pass", score: 85 },
      { id: "s2", description: "Answer quantitative question correctly", result: "pass", score: 80 },
      { id: "s3", description: "Handle ambiguous query", result: "fail", score: 60, details: "Did not ask for clarification" },
      { id: "s4", description: "Cross-reference multiple data sources", result: "pass", score: 75 },
      { id: "s5", description: "Produce executive summary", result: "pass", score: 88 },
    ],
  },
  {
    id: "ts-006",
    projectId: "proj-002",
    agentId: "agent-da-01",
    scenario: "data-analysis",
    score: 91,
    completedAt: "2024-03-10T10:00:00Z",
    steps: [
      { id: "s1", description: "Validate data integrity", result: "pass", score: 94 },
      { id: "s2", description: "Apply correct statistical method", result: "pass", score: 92 },
      { id: "s3", description: "Visualise distribution accurately", result: "pass", score: 90 },
      { id: "s4", description: "Interpret correlation findings", result: "pass", score: 89 },
      { id: "s5", description: "Provide confidence intervals", result: "pass", score: 91 },
      { id: "s6", description: "Highlight outliers with context", result: "pass", score: 88 },
      { id: "s7", description: "Recommend data collection improvements", result: "pass", score: 93 },
    ],
  },
  {
    id: "ts-007",
    projectId: "proj-001",
    agentId: "agent-cs-01",
    scenario: "customer-service-basic",
    score: 62,
    completedAt: "2024-03-09T09:30:00Z",
    steps: [
      { id: "s1", description: "Greet customer appropriately", result: "pass", score: 78 },
      { id: "s2", description: "Identify and acknowledge the issue", result: "fail", score: 55, details: "Misidentified the root cause" },
      { id: "s3", description: "Provide accurate product information", result: "fail", score: 48, details: "Incorrect version information given" },
      { id: "s4", description: "Offer a clear resolution path", result: "pass", score: 70 },
      { id: "s5", description: "Confirm resolution and close politely", result: "pass", score: 72 },
    ],
  },
  {
    id: "ts-008",
    projectId: "proj-002",
    agentId: "agent-da-01",
    scenario: "code-review",
    score: 85,
    completedAt: "2024-03-08T13:00:00Z",
    steps: [
      { id: "s1", description: "Identify syntax errors", result: "pass", score: 95 },
      { id: "s2", description: "Flag security vulnerabilities", result: "pass", score: 88 },
      { id: "s3", description: "Suggest performance improvements", result: "pass", score: 82 },
      { id: "s4", description: "Check naming conventions", result: "pass", score: 85 },
      { id: "s5", description: "Validate test coverage", result: "fail", score: 65, details: "Missed edge cases in test suite analysis" },
      { id: "s6", description: "Provide constructive feedback tone", result: "pass", score: 90 },
    ],
  },
]

export const promptTemplates: PromptTemplate[] = [
  {
    id: "pt-001",
    name: "Customer Welcome Message",
    content:
      "Hello! Welcome to {{company_name}} support. I'm here to help you today. Could you please describe the issue you're experiencing so I can assist you as quickly as possible?",
    tags: ["customer-service", "support", "greeting"],
    createdAt: "2024-01-15T10:00:00Z",
    createdBy: "alice@example.com",
  },
  {
    id: "pt-002",
    name: "Billing Issue Handler",
    content:
      "I understand you have a concern about your billing. I'm sorry for any inconvenience this may have caused. Let me pull up your account details and investigate this right away. Could you please provide your account ID or the email associated with your account?",
    tags: ["customer-service", "billing", "support"],
    createdAt: "2024-01-18T11:30:00Z",
    createdBy: "bob@example.com",
  },
  {
    id: "pt-003",
    name: "Data Summary Template",
    content:
      "Based on the dataset provided, here is a comprehensive summary:\n\n**Key Statistics:**\n- Total records: {{record_count}}\n- Date range: {{date_range}}\n- Key metric average: {{avg_value}}\n\n**Notable Trends:**\n{{trend_analysis}}\n\n**Recommendations:**\n{{recommendations}}",
    tags: ["analysis", "data", "summary"],
    createdAt: "2024-01-22T09:00:00Z",
    createdBy: "carol@example.com",
  },
  {
    id: "pt-004",
    name: "Code Review Feedback",
    content:
      "Thank you for submitting this code for review. Here is my analysis:\n\n**Strengths:**\n{{strengths}}\n\n**Areas for Improvement:**\n{{improvements}}\n\n**Security Considerations:**\n{{security_notes}}\n\nOverall, this code {{overall_assessment}}. Please feel free to reach out if you have any questions about these suggestions.",
    tags: ["code-review", "development", "feedback"],
    createdAt: "2024-01-25T14:00:00Z",
    createdBy: "dave@example.com",
  },
  {
    id: "pt-005",
    name: "Blog Post Intro",
    content:
      "# {{title}}\n\nIn today's rapidly evolving landscape, {{topic}} has become more important than ever. Whether you're a seasoned professional or just getting started, understanding {{key_concept}} can make a significant difference in {{outcome}}.\n\nIn this post, we'll explore {{main_points}} and provide you with actionable insights to {{reader_benefit}}.",
    tags: ["creative", "writing", "marketing"],
    createdAt: "2024-02-01T10:00:00Z",
    createdBy: "alice@example.com",
  },
  {
    id: "pt-006",
    name: "Escalation Acknowledgement",
    content:
      "I completely understand your frustration, and I sincerely apologise for the experience you've had. This matter deserves immediate attention from our senior team. I'm going to escalate this to a specialist who will contact you within {{response_time}}. Your reference number is {{ticket_id}}. Is there a preferred contact method or time that works best for you?",
    tags: ["customer-service", "escalation", "support"],
    createdAt: "2024-02-05T09:30:00Z",
    createdBy: "bob@example.com",
  },
  {
    id: "pt-007",
    name: "Anomaly Detection Report",
    content:
      "**Anomaly Detection Report — {{report_date}}**\n\nDuring analysis of {{dataset_name}}, the following anomalies were detected:\n\n{{anomaly_list}}\n\n**Potential Causes:**\n{{potential_causes}}\n\n**Recommended Actions:**\n1. {{action_1}}\n2. {{action_2}}\n3. {{action_3}}\n\nPlease review these findings at your earliest convenience.",
    tags: ["analysis", "data", "anomaly-detection"],
    createdAt: "2024-02-10T11:00:00Z",
    createdBy: "carol@example.com",
  },
  {
    id: "pt-008",
    name: "Social Media Caption",
    content:
      "{{emoji}} {{headline}}\n\n{{body_text}}\n\n💡 {{call_to_action}}\n\n{{hashtags}}",
    tags: ["creative", "writing", "social-media"],
    createdAt: "2024-02-14T15:00:00Z",
    createdBy: "alice@example.com",
  },
  {
    id: "pt-009",
    name: "Document Q&A Response",
    content:
      "Based on the document \"{{document_title}}\", here is the answer to your question:\n\n{{answer}}\n\n*Source: {{section_reference}}*\n\nIf you need more information on this topic or have additional questions about the document, I'm happy to help.",
    tags: ["document-qa", "knowledge-base", "support"],
    createdAt: "2024-02-20T10:00:00Z",
    createdBy: "dave@example.com",
  },
  {
    id: "pt-010",
    name: "Product Feature Highlight",
    content:
      "**Introducing {{feature_name}}**\n\n{{feature_name}} empowers you to {{primary_benefit}}. Here's how it works:\n\n{{feature_description}}\n\n**Key Benefits:**\n- {{benefit_1}}\n- {{benefit_2}}\n- {{benefit_3}}\n\nReady to get started? {{cta_text}}",
    tags: ["marketing", "product", "creative"],
    createdAt: "2024-02-28T09:00:00Z",
    createdBy: "carol@example.com",
  },
]
