# User Guide — AI Agent Life Cycle Management

This guide walks you through every section of the platform so you can get the most out of it quickly.

---

## Table of Contents

1. [Getting Around](#1-getting-around)
2. [Dashboard](#2-dashboard)
3. [Agents](#3-agents)
   - 3.1 [Viewing Agents](#31-viewing-agents)
   - 3.2 [Creating an Agent](#32-creating-an-agent)
   - 3.3 [Managing an Agent](#33-managing-an-agent)
4. [Business Agents](#4-business-agents)
5. [AI Studio](#5-ai-studio)
   - 5.1 [Training Ground](#51-training-ground)
   - 5.2 [Prompt Library](#52-prompt-library)
   - 5.3 [Training Metrics](#53-training-metrics)
6. [Trends & Research](#6-trends--research)
7. [Lifecycle Management](#7-lifecycle-management)
   - 7.1 [Lifecycle Stages](#71-lifecycle-stages)
   - 7.2 [Version History](#72-version-history)
   - 7.3 [Agent Templates](#73-agent-templates)
   - 7.4 [Retiring an Agent](#74-retiring-an-agent)
8. [Marketplace](#8-marketplace)
   - 8.1 [Discovering & Installing Agents](#81-discovering--installing-agents)
   - 8.2 [Managing Subscriptions](#82-managing-subscriptions)
   - 8.3 [Publishing an Agent](#83-publishing-an-agent)
9. [Analytics](#9-analytics)
10. [Settings](#10-settings)
    - 10.1 [Profile](#101-profile)
    - 10.2 [Team](#102-team)
    - 10.3 [Notifications](#103-notifications)
    - 10.4 [API Keys](#104-api-keys)
11. [Keyboard Shortcuts & Tips](#11-keyboard-shortcuts--tips)

---

## 1. Getting Around

The **top navigation bar** is always visible. Click any of the links to jump to that section:

| Nav Link | Section |
|---|---|
| **Dashboard** | Home overview |
| **Agents** | Your agent inventory |
| **Business Agents** | Department-organised view |
| **AI Studio** | Agent development workspace |
| **Trends** | AI news and research |
| **Lifecycle** | Lifecycle governance |
| **Marketplace** | Discover and share agents |

The **sun/moon icon** in the top-right corner switches between light and dark mode.

Your **user avatar** (top-right) opens profile and sign-out options.

---

## 2. Dashboard

The Dashboard (`/`) is your command centre. It loads automatically when you open the platform.

### KPI Cards

Four cards at the top give you an instant read on your fleet:

| Card | What it shows |
|---|---|
| **Total Agents** | Number of agents you have created |
| **Active Agents** | Agents currently running and serving requests |
| **Avg. Response Time** | Mean response latency across all active agents |
| **Success Rate** | Percentage of agent requests that completed without error |

Each card shows a trend arrow (↑ increase, → neutral, ↓ decrease) compared to the previous period.

### Agent Status Overview

A chart and status-breakdown table show how many agents are in each status (active, inactive, error).

### Top Agents

A ranked list of your best-performing agents by success rate or usage. Click an agent's name to view its details.

### Recent Activity

A chronological feed of the most recent actions on the platform (agent created, lifecycle transition, training session completed, etc.).

### Quick Actions

- **New Agent** button → goes directly to the agent creation form.
- **Settings** (gear) icon → opens the Settings page.

---

## 3. Agents

### 3.1 Viewing Agents

Navigate to **Agents** (`/agents`) to see all agents in a card grid.

**Searching:** Type in the search box to filter agents by name, description, or type in real time.

Each card shows:
- Agent name and type
- Short description
- Status badge (Active / Inactive)
- Last updated timestamp
- A `⋯` actions menu

### 3.2 Creating an Agent

1. Click **New Agent** (from the Dashboard or the Agents page header).
2. The creation wizard has three tabs:

#### Tab 1 — Basic Information

| Field | Description |
|---|---|
| **Agent Name** | A descriptive name (min. 3 characters) |
| **Description** | What the agent does (min. 10 characters) |
| **Agent Type** | Category: Customer Support, Analytics, Creative, Productivity, Research, Communication, or Custom |
| **Activate immediately** | Check to deploy the agent as soon as it is created |

#### Tab 2 — Model Configuration

| Field | Description |
|---|---|
| **AI Model** | The LLM that powers the agent (GPT-4o, GPT-4, GPT-3.5 Turbo, Claude 3 Opus/Sonnet, Llama 3 70B) |
| **System Prompt** | Instructions that define the agent's persona and constraints |
| **Max Tokens** | Maximum length of each response (100–4000) |
| **Temperature** | Creativity/randomness of responses (0 = deterministic, 1 = highly creative) |

#### Tab 3 — Tools & Capabilities

Select the tools the agent is allowed to use:

| Tool | What it enables |
|---|---|
| Web Search | Agent can search the internet for current information |
| Database Query | Agent can query structured data sources |
| File Access | Agent can read/write files |
| Email Sending | Agent can send emails on your behalf |
| Calendar Access | Agent can view and create calendar events |
| Code Execution | Agent can write and run code |

3. Click **Create Agent**. A loading spinner confirms the agent is being created.
4. You are redirected to the Agents list on success.

### 3.3 Managing an Agent

Open the `⋯` menu on any agent card:

| Action | Effect |
|---|---|
| **Edit** | Open the agent configuration for editing |
| **Pause / Activate** | Toggle the agent's active status |
| **Duplicate** | Create a copy of the agent as a starting point for a new one |
| **Analytics** | Jump to the per-agent analytics view |
| **Delete** | Permanently remove the agent (requires confirmation) |

---

## 4. Business Agents

Navigate to **Business Agents** (`/business-agents`) to view agents organised by your company structure.

**Overview tab** shows:
- A chart of agent distribution across departments.
- Key stats: total agents, most active department, ratio of specialised vs. cross-functional agents.
- Top knowledge domains (e.g., Customer Data, Product Knowledge, IT Systems).

**Division / Department / Expertise tabs** let you drill down by organisational unit or by the domain knowledge an agent specialises in.

This view is particularly useful for department heads or HR teams who want to audit which AI capabilities have been deployed in their area.

---

## 5. AI Studio

Navigate to **AI Studio** (`/studio`) to open your development workspace.

The **Overview** tab shows aggregate Studio stats (active projects, training sessions run, saved prompts) and a recent activity log for your team's studio actions.

### 5.1 Training Ground

The Training Ground lets you run structured evaluation scenarios against an agent to measure and improve its behaviour.

1. Select a **training scenario** from the scenario selector.
2. Click **Run** to start the session.
3. Results appear step by step — each evaluation step shows pass (✓) or fail (✗).
4. Review the **Training Metrics** chart to see how your agent's score has changed across sessions.

### 5.2 Prompt Library

Your Prompt Library is a shared repository of reusable prompt templates.

**Saving a prompt:**
1. Open the **Prompt Library** tab.
2. Click **New Prompt**.
3. Enter a name, the prompt content, and optional tags.
4. Click **Save**.

**Using a saved prompt:**
- Browse or search your library.
- Click a prompt to copy it to the clipboard or load it directly into an agent's system prompt field.

### 5.3 Training Metrics

The Training Metrics chart displays benchmark scores for each training session on an agent. Use it to:
- Confirm an agent has improved before promoting it to Production.
- Identify when a recent change degraded performance.

---

## 6. Trends & Research

Navigate to **Trends** (`/trends`) to stay up to date with the AI landscape.

### Breakthrough Alert

A card at the top of the page highlights the most significant recent AI development. Use the **Bookmark** or **Share** icons to save or share it.

### Filtering

Use the **category selector** to narrow trends to topics relevant to your team:
- All Categories
- Large Language Models
- Computer Vision
- Multimodal AI
- AI Agents
- AI Tools & Frameworks

Click **Refresh** to pull the latest content. The badge next to the button shows when the feed was last updated.

### Tabs

| Tab | Content |
|---|---|
| **Trending Topics** | Hot topics with momentum indicators |
| **News & Articles** | Curated AI news from leading sources |
| **Research Highlights** | Notable academic papers and industry reports |
| **Technology Radar** | Emerging technologies mapped to adoption stages (Adopt, Trial, Assess, Hold) |

---

## 7. Lifecycle Management

Navigate to **Lifecycle** (`/lifecycle`) to govern your agents through their full operational life.

### 7.1 Lifecycle Stages

Every agent lives in one of four stages:

| Stage | Meaning |
|---|---|
| **Development** | Agent is being built, configured, and tested — not yet serving production traffic |
| **Production** | Agent is live and actively handling real requests |
| **Maintenance** | Agent is temporarily offline or being updated |
| **Retirement** | Agent is being decommissioned and will no longer accept requests |

The **Overview** tab shows:
- A donut chart of stage distribution.
- A breakdown list with agent counts and percentages per stage.
- A **Recent Stage Transitions** log: who moved which agent between which stages, and when.

### 7.2 Version History

The **Version History** tab lists every release of each agent:
- Version number
- Changelog description
- Author and date

Use this to understand what changed between versions and roll back to an earlier configuration if needed.

### 7.3 Agent Templates

The **Templates** tab provides pre-built agent configurations that you can instantiate to jump-start Development-stage agents. Choose a template, give it a name, and it opens in the agent creation form pre-populated with sensible defaults.

### 7.4 Retiring an Agent

1. Go to the **Retirement** tab.
2. Find the agent you want to retire.
3. Follow the guided workflow:
   a. Confirm you intend to retire the agent.
   b. Set an end date.
   c. The agent's configuration is archived for audit purposes.
4. Retired agents are no longer reachable for new requests but remain visible in the Lifecycle view with a **Retired** badge.

---

## 8. Marketplace

Navigate to **Marketplace** (`/marketplace`) to discover, install, and publish AI agents.

### 8.1 Discovering & Installing Agents

1. Use the **search bar** to look for agents by name or keyword.
2. Use the **category filter** to narrow by Support, Analytics, Creative, or Productivity.
3. Click **Filter** for advanced options.
4. Browse the **Featured Agents** section for curated recommendations.
5. On any agent card, click **Install** to add it to your agent inventory. The button changes to **Installed** once complete.

### 8.2 Managing Subscriptions

Click the **Subscriptions** tab to see all agents you have installed. From here you can:
- **Update** an agent to the latest version published by the author.
- **Unsubscribe** to remove the agent from your inventory.

### 8.3 Publishing an Agent

Share your own agents with the community:

1. Click **Publish Agent** (top-right of the Marketplace page) or open the **Publish** tab.
2. Fill in the publication form:
   - Title and description
   - Category
   - Version number
   - Select the agent from your inventory
3. Click **Submit for Review**. Your agent will appear in the catalogue once approved.

---

## 9. Analytics

Navigate to **Analytics** (`/analytics`) for deep operational insights into your agents.

### Time Window

Use the **time selector** (top-right of the analytics area) to choose the analysis period:
- Last 24 hours
- Last 7 days
- Last 30 days
- Last 90 days

### Performance Tab

| Metric | What it measures |
|---|---|
| **Avg. Response Time** | Mean latency for all agent requests |
| **Success Rate** | Percentage of requests completed without error |
| **Throughput** | Requests processed per minute |
| **Availability** | Uptime percentage |

Two charts are shown:
- **Response Time** — per-agent average latency (bar chart).
- **Performance Trends** — success rate over time (line chart).

### Usage Tab

Shows token consumption, request volume, and the number of active users for the selected period.

### Errors Tab

The **Error Rate** chart breaks down error percentages by agent type, helping you quickly identify which category of agent is experiencing the most issues.

---

## 10. Settings

Navigate to **Settings** (`/settings`) to configure your account and team.

### 10.1 Profile

Update your:
- Display name
- Email address
- Profile picture / avatar
- Timezone

Click **Save Changes** to apply.

### 10.2 Team

Manage who has access to the platform:

- **Invite Member** — enter an email address and select a role.
- **Roles:**
  - **Owner** — full access including billing and team management.
  - **Admin** — can create, edit, and delete agents and manage most settings.
  - **Member** — can create and edit agents but cannot delete or manage team settings.
  - **Viewer** — read-only access to all dashboards and lists.
- **Remove Member** — revokes their access immediately.

### 10.3 Notifications

Toggle which events trigger notifications and choose your preferred channel (email or in-app):

| Event | Description |
|---|---|
| Lifecycle Transitions | Agent moves between Development, Production, Maintenance, or Retirement |
| Agent Errors | An agent exceeds its error rate threshold |
| Marketplace Updates | A subscribed marketplace agent has a new version available |
| Team Activity | Team members are added or removed |

### 10.4 API Keys

Use API keys to integrate the platform programmatically with your own tools and workflows.

- **Generate Key** — creates a new API key. **Copy the key immediately** — it will not be shown again.
- **Label** — give each key a descriptive name (e.g., "CI Pipeline", "Internal Dashboard").
- **Permissions** — scope keys to read-only, write, or admin access.
- **Revoke** — immediately invalidates a key.

---

## 11. Keyboard Shortcuts & Tips

| Shortcut / Tip | Effect |
|---|---|
| Click the **AI Agents Platform** logo | Return to the Dashboard from any page |
| Use the **search box** on the Agents page | Filter agents live as you type — no need to press Enter |
| Press **Tab** to navigate form fields | All forms are keyboard-accessible |
| Dark mode toggle | Remembers your preference across sessions via `localStorage` |
| **Refresh** button on Trends | Simulates a content update — connect a live feed for real-time data |
| Agent **Duplicate** action | Fastest way to create a variant of an existing agent |
