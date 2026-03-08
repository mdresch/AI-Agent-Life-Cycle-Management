export type TrendCategory =
  | "all"
  | "large-language-models"
  | "computer-vision"
  | "multimodal-ai"
  | "ai-agents"
  | "ai-tools-frameworks"

export const TREND_CATEGORY_LABELS: Record<TrendCategory, string> = {
  all: "All Categories",
  "large-language-models": "Large Language Models",
  "computer-vision": "Computer Vision",
  "multimodal-ai": "Multimodal AI",
  "ai-agents": "AI Agents",
  "ai-tools-frameworks": "AI Tools & Frameworks",
}

export interface BreakthroughAlert {
  id: string
  title: string
  summary: string
  source: string
  sourceUrl: string
  publishedAt: string
  category: TrendCategory
  isBookmarked: boolean
}

export interface TrendingTopic {
  id: string
  name: string
  category: TrendCategory
  momentum: "rising" | "stable" | "declining"
  articleCount: number
  weeklyChangePercent: number
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  sourceUrl: string
  publishedAt: string
  category: TrendCategory
  tags: string[]
  isBookmarked: boolean
}

export interface ResearchHighlight {
  id: string
  title: string
  authors: string[]
  publication: string
  publishedAt: string
  abstract: string
  category: TrendCategory
  paperUrl?: string
}

export type RadarStage = "adopt" | "trial" | "assess" | "hold"

export interface RadarEntry {
  id: string
  name: string
  stage: RadarStage
  description: string
  category: TrendCategory
  isNew: boolean
}

export const breakthroughAlert: BreakthroughAlert = {
  id: "ba-001",
  title: "GPT-5 Achieves Human-Level Performance Across Diverse Benchmarks",
  summary:
    "OpenAI's GPT-5 demonstrates unprecedented reasoning abilities, outperforming human experts on the MMLU, GPQA, and HumanEval benchmarks. The model introduces a novel chain-of-thought architecture that enables multi-step planning and autonomous error correction, marking a significant leap toward general-purpose AI agents.",
  source: "OpenAI Blog",
  sourceUrl: "https://openai.com/blog",
  publishedAt: "2025-05-20T09:00:00Z",
  category: "large-language-models",
  isBookmarked: false,
}

export const trendingTopics: TrendingTopic[] = [
  {
    id: "tt-001",
    name: "Autonomous AI Agents",
    category: "ai-agents",
    momentum: "rising",
    articleCount: 1482,
    weeklyChangePercent: 38,
  },
  {
    id: "tt-002",
    name: "Mixture-of-Experts Models",
    category: "large-language-models",
    momentum: "rising",
    articleCount: 934,
    weeklyChangePercent: 52,
  },
  {
    id: "tt-003",
    name: "Retrieval-Augmented Generation",
    category: "large-language-models",
    momentum: "stable",
    articleCount: 2103,
    weeklyChangePercent: 3,
  },
  {
    id: "tt-004",
    name: "Vision-Language Models",
    category: "multimodal-ai",
    momentum: "rising",
    articleCount: 870,
    weeklyChangePercent: 29,
  },
  {
    id: "tt-005",
    name: "3D Scene Understanding",
    category: "computer-vision",
    momentum: "rising",
    articleCount: 445,
    weeklyChangePercent: 17,
  },
  {
    id: "tt-006",
    name: "LLM Fine-Tuning Techniques",
    category: "large-language-models",
    momentum: "stable",
    articleCount: 1620,
    weeklyChangePercent: 1,
  },
  {
    id: "tt-007",
    name: "AI Orchestration Frameworks",
    category: "ai-tools-frameworks",
    momentum: "rising",
    articleCount: 703,
    weeklyChangePercent: 44,
  },
  {
    id: "tt-008",
    name: "Object Detection at Edge",
    category: "computer-vision",
    momentum: "stable",
    articleCount: 589,
    weeklyChangePercent: 2,
  },
  {
    id: "tt-009",
    name: "Multi-Agent Collaboration",
    category: "ai-agents",
    momentum: "rising",
    articleCount: 812,
    weeklyChangePercent: 61,
  },
  {
    id: "tt-010",
    name: "Speech-to-Speech Models",
    category: "multimodal-ai",
    momentum: "rising",
    articleCount: 378,
    weeklyChangePercent: 33,
  },
  {
    id: "tt-011",
    name: "Neural Architecture Search",
    category: "ai-tools-frameworks",
    momentum: "declining",
    articleCount: 210,
    weeklyChangePercent: -18,
  },
  {
    id: "tt-012",
    name: "Prompt Engineering",
    category: "large-language-models",
    momentum: "declining",
    articleCount: 940,
    weeklyChangePercent: -12,
  },
  {
    id: "tt-013",
    name: "Synthetic Data Generation",
    category: "ai-tools-frameworks",
    momentum: "stable",
    articleCount: 487,
    weeklyChangePercent: 4,
  },
  {
    id: "tt-014",
    name: "Embodied AI & Robotics",
    category: "ai-agents",
    momentum: "rising",
    articleCount: 631,
    weeklyChangePercent: 25,
  },
]

export const newsArticles: NewsArticle[] = [
  {
    id: "na-001",
    title: "OpenAI Unveils GPT-5 with Revolutionary Reasoning Architecture",
    summary:
      "OpenAI's latest flagship model introduces a new chain-of-thought mechanism that enables step-by-step planning and self-correction during inference.",
    source: "The Verge",
    sourceUrl: "https://theverge.com",
    publishedAt: "2025-05-20T10:00:00Z",
    category: "large-language-models",
    tags: ["GPT-5", "OpenAI", "Reasoning", "Benchmarks"],
    isBookmarked: false,
  },
  {
    id: "na-002",
    title: "Google DeepMind's Gemini Ultra 2 Tops Multimodal Benchmarks",
    summary:
      "The new Gemini Ultra 2 model achieves state-of-the-art results on video understanding, image generation, and long-form document tasks simultaneously.",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    publishedAt: "2025-05-18T14:00:00Z",
    category: "multimodal-ai",
    tags: ["Gemini", "Google", "Multimodal", "Video AI"],
    isBookmarked: false,
  },
  {
    id: "na-003",
    title: "LangGraph 0.3 Brings Stateful Multi-Agent Workflows to Production",
    summary:
      "The latest release of LangGraph introduces persistent state management and native support for long-running agent processes with automatic checkpointing.",
    source: "InfoQ",
    sourceUrl: "https://infoq.com",
    publishedAt: "2025-05-17T08:30:00Z",
    category: "ai-tools-frameworks",
    tags: ["LangGraph", "LangChain", "Multi-Agent", "Workflows"],
    isBookmarked: true,
  },
  {
    id: "na-004",
    title: "Meta's SAM 3 Enables Zero-Shot 3D Segmentation in Real Time",
    summary:
      "Segment Anything Model 3 extends SAM's capabilities to 3D point clouds, enabling real-time segmentation of complex scenes without task-specific training.",
    source: "Papers with Code",
    sourceUrl: "https://paperswithcode.com",
    publishedAt: "2025-05-16T11:00:00Z",
    category: "computer-vision",
    tags: ["SAM", "Meta", "3D Segmentation", "Zero-Shot"],
    isBookmarked: false,
  },
  {
    id: "na-005",
    title: "AutoGPT Successor 'AgentOS' Hits 10,000 GitHub Stars in 48 Hours",
    summary:
      "The open-source AgentOS project reimagines autonomous agents with a modular tool-use framework, persistent memory, and built-in safety guardrails.",
    source: "GitHub Blog",
    sourceUrl: "https://github.blog",
    publishedAt: "2025-05-15T09:00:00Z",
    category: "ai-agents",
    tags: ["AgentOS", "Open Source", "Autonomous Agents", "Safety"],
    isBookmarked: false,
  },
  {
    id: "na-006",
    title: "Anthropic Publishes Constitutional AI 2.0 Research Results",
    summary:
      "Constitutional AI 2.0 demonstrates improved harmlessness without sacrificing helpfulness, with new techniques for scalable human feedback alignment.",
    source: "Anthropic",
    sourceUrl: "https://anthropic.com",
    publishedAt: "2025-05-14T16:00:00Z",
    category: "large-language-models",
    tags: ["Anthropic", "Claude", "Safety", "Alignment"],
    isBookmarked: false,
  },
  {
    id: "na-007",
    title: "Microsoft Copilot Studio Gains Native MCP Protocol Support",
    summary:
      "Copilot Studio now natively supports the Model Context Protocol, allowing developers to connect enterprise agents to any MCP-compatible data source.",
    source: "Microsoft Blog",
    sourceUrl: "https://blogs.microsoft.com",
    publishedAt: "2025-05-13T12:00:00Z",
    category: "ai-tools-frameworks",
    tags: ["Microsoft", "Copilot", "MCP", "Enterprise"],
    isBookmarked: false,
  },
  {
    id: "na-008",
    title: "Stanford HAI Reports 340% Surge in Agentic AI Research Papers",
    summary:
      "The 2025 AI Index from Stanford shows a dramatic increase in research output focused on agentic systems, tool use, and autonomous decision-making.",
    source: "Stanford HAI",
    sourceUrl: "https://hai.stanford.edu",
    publishedAt: "2025-05-12T10:00:00Z",
    category: "ai-agents",
    tags: ["Research", "Stanford", "Trends", "Agentic AI"],
    isBookmarked: false,
  },
  {
    id: "na-009",
    title: "Mistral AI Releases Codestral Mamba for Ultra-Fast Code Generation",
    summary:
      "Codestral Mamba leverages state-space model architecture to deliver 10x inference throughput over transformer-based code models while maintaining code quality.",
    source: "Mistral AI",
    sourceUrl: "https://mistral.ai",
    publishedAt: "2025-05-11T08:00:00Z",
    category: "large-language-models",
    tags: ["Mistral", "Code Generation", "Mamba", "SSM"],
    isBookmarked: false,
  },
  {
    id: "na-010",
    title: "NVIDIA Releases Cosmos World Foundation Model for Robotics",
    summary:
      "Cosmos generates physically accurate simulated environments for training embodied AI agents, dramatically reducing real-world data requirements.",
    source: "NVIDIA Developer Blog",
    sourceUrl: "https://developer.nvidia.com/blog",
    publishedAt: "2025-05-10T14:00:00Z",
    category: "multimodal-ai",
    tags: ["NVIDIA", "Robotics", "Simulation", "Embodied AI"],
    isBookmarked: false,
  },
  {
    id: "na-011",
    title: "Apple's Vision Pro Gets On-Device Multimodal AI in visionOS 3",
    summary:
      "visionOS 3 introduces an on-device multimodal model capable of understanding spatial context, hand gestures, and natural language simultaneously.",
    source: "9to5Mac",
    sourceUrl: "https://9to5mac.com",
    publishedAt: "2025-05-09T10:00:00Z",
    category: "multimodal-ai",
    tags: ["Apple", "Vision Pro", "On-Device AI", "visionOS"],
    isBookmarked: false,
  },
  {
    id: "na-012",
    title: "Hugging Face Transformers 5.0 Supports Unified Vision-Language API",
    summary:
      "The major version release unifies text, vision, and audio model APIs, making it easier to build cross-modal pipelines with a single consistent interface.",
    source: "Hugging Face",
    sourceUrl: "https://huggingface.co",
    publishedAt: "2025-05-08T09:00:00Z",
    category: "ai-tools-frameworks",
    tags: ["Hugging Face", "Transformers", "API", "Open Source"],
    isBookmarked: false,
  },
  {
    id: "na-013",
    title: "Tesla Optimus Gen 3 Demonstrates Fully Autonomous Manipulation",
    summary:
      "Optimus Gen 3 uses a vision-language-action model to perform complex household tasks end-to-end without task-specific programming.",
    source: "Electrek",
    sourceUrl: "https://electrek.co",
    publishedAt: "2025-05-07T15:00:00Z",
    category: "computer-vision",
    tags: ["Tesla", "Robotics", "Vision-Language-Action", "Manipulation"],
    isBookmarked: false,
  },
  {
    id: "na-014",
    title: "AWS Bedrock Adds Native Agent-to-Agent Communication Layer",
    summary:
      "Amazon Bedrock's new multi-agent framework allows AWS-hosted agents to delegate subtasks and share context across organizational boundaries securely.",
    source: "AWS News Blog",
    sourceUrl: "https://aws.amazon.com/blogs",
    publishedAt: "2025-05-06T11:00:00Z",
    category: "ai-agents",
    tags: ["AWS", "Bedrock", "Multi-Agent", "Cloud"],
    isBookmarked: false,
  },
  {
    id: "na-015",
    title: "Google Releases DepthPro 2: Metric Depth Estimation from Single Images",
    summary:
      "DepthPro 2 achieves sub-centimeter depth accuracy from monocular images, enabling precise 3D reconstruction for AR/VR and robotics applications.",
    source: "Google AI Blog",
    sourceUrl: "https://ai.google/research",
    publishedAt: "2025-05-05T10:00:00Z",
    category: "computer-vision",
    tags: ["Google", "Depth Estimation", "3D Vision", "Monocular"],
    isBookmarked: false,
  },
  {
    id: "na-016",
    title: "Ollama 0.5 Introduces Multi-Modal and Function-Calling Support",
    summary:
      "The popular local LLM runner now supports vision models and structured function-calling, making it a full-featured local alternative to cloud AI APIs.",
    source: "Hacker News",
    sourceUrl: "https://news.ycombinator.com",
    publishedAt: "2025-05-04T08:00:00Z",
    category: "ai-tools-frameworks",
    tags: ["Ollama", "Local LLM", "Function Calling", "Open Source"],
    isBookmarked: false,
  },
  {
    id: "na-017",
    title: "xAI's Grok 3 Leads on Long-Context and Math Reasoning Tasks",
    summary:
      "Grok 3 introduces a 256K context window and achieves top scores on MATH-500 and competition-level coding benchmarks, rivaling frontier models.",
    source: "xAI",
    sourceUrl: "https://x.ai",
    publishedAt: "2025-05-03T14:00:00Z",
    category: "large-language-models",
    tags: ["xAI", "Grok", "Long-Context", "Math Reasoning"],
    isBookmarked: false,
  },
  {
    id: "na-018",
    title: "CrewAI Raises $100M Series B to Scale Enterprise Agent Deployments",
    summary:
      "CrewAI's enterprise platform, which enables orchestration of specialized AI agent teams, has secured $100M to expand its multi-agent deployment infrastructure.",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    publishedAt: "2025-05-01T10:00:00Z",
    category: "ai-agents",
    tags: ["CrewAI", "Funding", "Enterprise", "Agent Orchestration"],
    isBookmarked: false,
  },
]

export const researchHighlights: ResearchHighlight[] = [
  {
    id: "rh-001",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans"],
    publication: "NeurIPS 2025",
    publishedAt: "2025-05-01T00:00:00Z",
    abstract:
      "We show that generating a chain of intermediate reasoning steps substantially improves the ability of large language models to perform complex reasoning. A simple method called chain-of-thought prompting, where a few chain of thought demonstrations are provided as exemplars, significantly improves multi-step reasoning on arithmetic and symbolic reasoning tasks.",
    category: "large-language-models",
    paperUrl: "https://arxiv.org/abs/2201.11903",
  },
  {
    id: "rh-002",
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    authors: ["Timo Schick", "Jane Dwivedi-Yu", "Roberto Dessì"],
    publication: "ICML 2025",
    publishedAt: "2025-04-20T00:00:00Z",
    abstract:
      "We introduce Toolformer, a model trained to decide which APIs to call, when to call them, what arguments to pass, and how to incorporate the results into future token prediction. This enables the model to leverage external tools such as calculators, search engines, and translation systems while maintaining language modeling capabilities.",
    category: "ai-agents",
    paperUrl: "https://arxiv.org/abs/2302.04761",
  },
  {
    id: "rh-003",
    title: "Segment Anything in 3D with NeRFs",
    authors: ["Jiazhong Cen", "Zanwei Zhou", "Huaijin Chen"],
    publication: "CVPR 2025",
    publishedAt: "2025-04-15T00:00:00Z",
    abstract:
      "We present SA3D, a method that leverages SAM for segmenting objects in 3D neural radiance fields. Given a single click prompt in one view, SA3D can efficiently segment the corresponding 3D object across all views by propagating the 2D mask using the NeRF representation.",
    category: "computer-vision",
    paperUrl: "https://arxiv.org/abs/2304.12308",
  },
  {
    id: "rh-004",
    title: "LLaVA-Next: Improved Baselines with Visual Instruction Tuning",
    authors: ["Haotian Liu", "Chunyuan Li", "Yuheng Li"],
    publication: "ICLR 2025",
    publishedAt: "2025-04-10T00:00:00Z",
    abstract:
      "We present LLaVA-NeXT, an improved large multimodal model building on LLaVA by incorporating dynamic high-resolution image processing, enhanced visual instruction tuning data, and improved visual encoders. The model achieves state-of-the-art performance on a wide range of multimodal benchmarks.",
    category: "multimodal-ai",
    paperUrl: "https://arxiv.org/abs/2310.03744",
  },
  {
    id: "rh-005",
    title: "AutoGen: Enabling Next-Generation LLM Applications via Multi-Agent Conversation",
    authors: ["Qingyun Wu", "Gagan Bansal", "Jieyu Zhang"],
    publication: "COLM 2025",
    publishedAt: "2025-04-05T00:00:00Z",
    abstract:
      "We introduce AutoGen, a framework that enables development of LLM applications using multiple conversational agents that can cooperate to solve tasks. AutoGen agents are customizable, conversable, and seamlessly allow human participation. The framework simplifies orchestration, automation, and optimization of complex LLM workflows.",
    category: "ai-agents",
    paperUrl: "https://arxiv.org/abs/2308.08155",
  },
  {
    id: "rh-006",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: ["Edward J. Hu", "Yelong Shen", "Phillip Wallis"],
    publication: "ICLR 2025 (Best Paper Honorable Mention)",
    publishedAt: "2025-03-25T00:00:00Z",
    abstract:
      "We propose Low-Rank Adaptation (LoRA), which freezes pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture. LoRA reduces the number of trainable parameters by 10,000x and GPU memory requirement by 3x compared to full fine-tuning while maintaining model quality.",
    category: "large-language-models",
    paperUrl: "https://arxiv.org/abs/2106.09685",
  },
  {
    id: "rh-007",
    title: "Diffusion Models for Video Prediction and Generation",
    authors: ["Tim Brooks", "Bill Peebles", "Connor Holmes"],
    publication: "ECCV 2025",
    publishedAt: "2025-03-15T00:00:00Z",
    abstract:
      "We introduce Sora, a diffusion model capable of generating high-fidelity videos up to 60 seconds in length. By treating video as sequences of spacetime patches, Sora scales effectively with compute and demonstrates emergent capabilities in simulating physical world dynamics.",
    category: "multimodal-ai",
    paperUrl: "https://arxiv.org/abs/2402.17177",
  },
  {
    id: "rh-008",
    title: "LLM-Compiler: Synthesizing Optimized Programs with Language Models",
    authors: ["Chris Cummins", "Volker Seeker", "Dejan Grubisic"],
    publication: "MLSys 2025",
    publishedAt: "2025-03-05T00:00:00Z",
    abstract:
      "We present LLM-Compiler, a suite of large language models trained to understand compiler intermediate representations and optimization strategies. The models achieve state-of-the-art performance on code optimization benchmarks, reducing compute cost by 15% on average across production workloads.",
    category: "ai-tools-frameworks",
    paperUrl: "https://arxiv.org/abs/2407.02524",
  },
  {
    id: "rh-009",
    title: "Depth Anything V2: Stronger, More Accurate Monocular Depth Estimation",
    authors: ["Lihe Yang", "Bingyi Kang", "Zilong Huang"],
    publication: "CVPR 2025",
    publishedAt: "2025-02-20T00:00:00Z",
    abstract:
      "We present Depth Anything V2, which outperforms V1 in accuracy, detail preservation, and robustness across diverse scenes. Key improvements include synthetic data generation for hard cases, a larger teacher model, and a pseudo-label refinement pipeline that dramatically reduces the sim-to-real gap.",
    category: "computer-vision",
    paperUrl: "https://arxiv.org/abs/2406.09414",
  },
]

export const radarEntries: RadarEntry[] = [
  // Adopt (4)
  {
    id: "re-001",
    name: "Retrieval-Augmented Generation (RAG)",
    stage: "adopt",
    description:
      "Mature pattern for grounding LLM outputs in external knowledge. Well-supported across all major frameworks.",
    category: "large-language-models",
    isNew: false,
  },
  {
    id: "re-002",
    name: "LoRA / QLoRA Fine-Tuning",
    stage: "adopt",
    description:
      "Parameter-efficient fine-tuning is now standard practice for adapting foundation models to domain-specific tasks.",
    category: "large-language-models",
    isNew: false,
  },
  {
    id: "re-003",
    name: "LangChain / LangGraph",
    stage: "adopt",
    description:
      "Industry-standard orchestration framework for building LLM-powered chains and stateful multi-agent workflows.",
    category: "ai-tools-frameworks",
    isNew: false,
  },
  {
    id: "re-004",
    name: "Vision Transformers (ViT)",
    stage: "adopt",
    description:
      "Transformer-based vision architectures have displaced CNNs as the dominant paradigm for image understanding tasks.",
    category: "computer-vision",
    isNew: false,
  },
  // Trial (4)
  {
    id: "re-005",
    name: "Model Context Protocol (MCP)",
    stage: "trial",
    description:
      "Emerging open standard for connecting AI agents to external tools and data sources. Gaining rapid adoption across major platforms.",
    category: "ai-tools-frameworks",
    isNew: true,
  },
  {
    id: "re-006",
    name: "Multi-Agent Orchestration",
    stage: "trial",
    description:
      "Frameworks like CrewAI and AutoGen enable teams of specialized agents to collaborate. Production deployments are still maturing.",
    category: "ai-agents",
    isNew: true,
  },
  {
    id: "re-007",
    name: "Vision-Language-Action Models",
    stage: "trial",
    description:
      "VLA models unify perception and action for robotic control. Promising results in manipulation but real-world reliability is still improving.",
    category: "multimodal-ai",
    isNew: false,
  },
  {
    id: "re-008",
    name: "Mixture-of-Experts (MoE) Inference",
    stage: "trial",
    description:
      "Sparse MoE architectures offer improved efficiency at scale. Deployment tooling is maturing but routing complexity remains a challenge.",
    category: "large-language-models",
    isNew: true,
  },
  // Assess (3)
  {
    id: "re-009",
    name: "Neurosymbolic AI Integration",
    stage: "assess",
    description:
      "Combining neural networks with symbolic reasoning offers robustness guarantees, but integration complexity limits practical adoption so far.",
    category: "ai-agents",
    isNew: false,
  },
  {
    id: "re-010",
    name: "Diffusion-Based Video Generation",
    stage: "assess",
    description:
      "Models like Sora produce impressive results but inference cost, temporal consistency, and controllability remain open research problems.",
    category: "multimodal-ai",
    isNew: false,
  },
  {
    id: "re-011",
    name: "3D Gaussian Splatting",
    stage: "assess",
    description:
      "Rasterization-based 3D scene representation offers real-time rendering but asset creation pipelines and editing tooling are still nascent.",
    category: "computer-vision",
    isNew: true,
  },
  // Hold (3)
  {
    id: "re-012",
    name: "Traditional AutoML",
    stage: "hold",
    description:
      "Automated machine learning pipelines are being superseded by LLM-based data science assistants that offer more flexible and interactive workflows.",
    category: "ai-tools-frameworks",
    isNew: false,
  },
  {
    id: "re-013",
    name: "Standalone Prompt Engineering",
    stage: "hold",
    description:
      "Pure prompt-based optimization is giving way to fine-tuning and RAG patterns that offer more reliable, production-grade performance.",
    category: "large-language-models",
    isNew: false,
  },
  {
    id: "re-014",
    name: "Rule-Based Computer Vision Pipelines",
    stage: "hold",
    description:
      "Hand-crafted feature engineering and rule-based detection have been largely outperformed by end-to-end deep learning across all vision tasks.",
    category: "computer-vision",
    isNew: false,
  },
]
