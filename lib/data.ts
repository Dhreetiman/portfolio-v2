import { IExperience, IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'dhreetiman02@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Dhreetiman, I am reaching out to you because...',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Dhreetiman' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/dhreetiman-prasad/' },
];

export const MY_STACK = {
    languages: [
        { name: 'JavaScript', icon: '/logo/js.png' },
        { name: 'TypeScript', icon: '/logo/ts.png' },
        { name: 'Python', icon: '/logo/placeholder.svg' },
        { name: 'SQL', icon: '/logo/placeholder.svg' },
        { name: 'HTML/CSS', icon: '/logo/placeholder.svg' },
    ],
    backend: [
        { name: 'Node.js', icon: '/logo/node.png' },
        { name: 'Express', icon: '/logo/express.png' },
        { name: 'Nest.js', icon: '/logo/nest.svg' },
        { name: 'FastAPI', icon: '/logo/placeholder.svg' },
        { name: 'Sequelize.js', icon: '/logo/placeholder.svg' },
    ],
    ai: [
        { name: 'RAG', icon: '/logo/placeholder.svg' },
        { name: 'Pinecone', icon: '/logo/placeholder.svg' },
        { name: 'Qdrant', icon: '/logo/placeholder.svg' },
        { name: 'LangChain', icon: '/logo/placeholder.svg' },
        { name: 'LangGraph', icon: '/logo/placeholder.svg' },
        { name: 'OpenAI API', icon: '/logo/placeholder.svg' },
        { name: 'HuggingFace', icon: '/logo/placeholder.svg' },
        { name: 'PyTorch', icon: '/logo/placeholder.svg' },
        { name: 'Scikit-learn', icon: '/logo/placeholder.svg' },
        { name: 'Pandas', icon: '/logo/placeholder.svg' },
    ],
    databases: [
        { name: 'PostgreSQL', icon: '/logo/postgreSQL.png' },
        { name: 'MongoDB', icon: '/logo/mongodb.svg' },
        { name: 'MySQL', icon: '/logo/mysql.svg' },
        { name: 'Redis', icon: '/logo/placeholder.svg' },
    ],
    devops: [
        { name: 'AWS', icon: '/logo/aws.png' },
        { name: 'Docker', icon: '/logo/docker.svg' },
        { name: 'Jenkins', icon: '/logo/placeholder.svg' },
        { name: 'NGINX', icon: '/logo/placeholder.svg' },
        { name: 'Kafka', icon: '/logo/placeholder.svg' },
        { name: 'Prometheus', icon: '/logo/placeholder.svg' },
        { name: 'Grafana', icon: '/logo/placeholder.svg' },
    ],
    tools: [
        { name: 'Git', icon: '/logo/git.png' },
        { name: 'Postman', icon: '/logo/placeholder.svg' },
        { name: 'JIRA', icon: '/logo/placeholder.svg' },
        { name: 'WebSocket', icon: '/logo/placeholder.svg' },
        { name: 'OCPP', icon: '/logo/placeholder.svg' },
        { name: 'Mocha', icon: '/logo/placeholder.svg' },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Multi-Agent Research Assistant',
        slug: 'multi-agent-research-assistant',
        year: 2025,
        description: `An AI multi-agent research platform that takes a question, breaks it down across specialized agents, and produces a cited, fact-checked report. <br/><br/>

        Key Features:
        <ul>
          <li>🧠 Six specialized agents: research, web search, summarization, fact-checking, citation, report generation — orchestrated via LangGraph</li>
          <li>📄 PDF ingestion and document memory backed by a Qdrant vector store</li>
          <li>🔎 RAG pipeline with citation-aware generation so every claim is traceable</li>
          <li>⚡ Async FastAPI backend with WebSocket token streaming for real-time output</li>
          <li>🐳 Containerized with Docker for reproducible local + production runs</li>
        </ul>`,
        role: `Sole developer. End-to-end design and implementation:<br/>
        - Designed the agent graph and inter-agent message contracts in LangGraph.<br/>
        - Built the RAG ingestion pipeline (PDF → chunks → embeddings → Qdrant) and citation-aware retrieval.<br/>
        - Implemented WebSocket token streaming so the UI sees the report assemble live.<br/>
        - Wired Redis for short-term agent memory and async coordination.`,
        techStack: [
            'FastAPI',
            'OpenAI',
            'LangGraph',
            'Qdrant',
            'Redis',
            'Docker',
        ],
        thumbnail: '/projects/thumbnail/placeholder.svg',
        longThumbnail: '/projects/long/placeholder.svg',
        images: ['/projects/images/placeholder.svg'],
    },
    {
        title: 'AI API Gateway',
        slug: 'ai-api-gateway',
        year: 2025,
        description: `A production-grade gateway sitting in front of multiple LLM providers, giving applications one stable interface with cost control, observability, and high availability. <br/><br/>

        Key Features:
        <ul>
          <li>🔀 Intelligent model selection across providers based on request shape and cost</li>
          <li>💰 Per-request token + cost tracking, attributable to API keys</li>
          <li>🛑 Rate limiting and API-key authentication at the edge</li>
          <li>♻️ Redis response caching with retry and provider fallback for resilience</li>
          <li>📈 Prometheus + Grafana observability for latency, error rates, and request tracing</li>
        </ul>`,
        role: `Sole developer. Built the gateway end-to-end:<br/>
        - Designed the provider abstraction and routing layer in FastAPI.<br/>
        - Implemented Redis caching with TTL strategy and provider-failover retries.<br/>
        - Modeled API keys, quotas, and usage records in PostgreSQL.<br/>
        - Instrumented every hop with Prometheus metrics and wired Grafana dashboards for latency/error/cost views.<br/>
        - Fronted the service with NGINX and packaged everything with Docker.`,
        techStack: [
            'FastAPI',
            'Redis',
            'PostgreSQL',
            'Prometheus',
            'Grafana',
            'Docker',
            'NGINX',
        ],
        thumbnail: '/projects/thumbnail/placeholder.svg',
        longThumbnail: '/projects/long/placeholder.svg',
        images: ['/projects/images/placeholder.svg'],
    },
    {
        title: 'Openwave',
        slug: 'openwave',
        year: 2025,
        description: `A social platform built for programmers — posts, coding challenges, real-time chat, and in-browser code execution across 13 languages. <br/><br/>

        Key Features:
        <ul>
          <li>👥 Programmer-focused social graph: profiles, posts, conversations</li>
          <li>🧩 Coding challenges and submissions with per-language judging</li>
          <li>💬 Socket.IO real-time chat between users</li>
          <li>▶️ Code execution across 13 languages via the Piston API</li>
          <li>🖼️ AWS S3 presigned uploads for media and submission artifacts</li>
        </ul>`,
        role: `Backend lead. Owned the server-side from schema design to API surface:<br/>
        - Shipped 68 REST endpoints in TypeScript/Express with typed request/response contracts.<br/>
        - Modeled 17 entities (profiles, coding challenges, submissions, posts, conversations) in Prisma/PostgreSQL.<br/>
        - Built the Socket.IO real-time chat layer with presence and message persistence.<br/>
        - Integrated the Piston API for code execution and AWS S3 for presigned upload flows.<br/>
        - Next.js frontend in progress.`,
        techStack: [
            'Node.js',
            'Express',
            'TypeScript',
            'Socket.IO',
            'Prisma',
            'PostgreSQL',
            'AWS S3',
            'Next.js',
        ],
        thumbnail: '/projects/thumbnail/placeholder.svg',
        longThumbnail: '/projects/long/placeholder.svg',
        images: ['/projects/images/placeholder.svg'],
    },
];

export const MY_EXPERIENCE: IExperience[] = [
    {
        slug: 'eliteware-solutions',
        title: 'Software Engineer',
        company: 'Eliteware Solutions',
        duration: 'Oct 2023 - Present',
        location: 'Vadodara, Gujarat',
        summary:
            'Backend and AI engineer leading architecture, performance, and delivery across multiple production products — most notably Klimates, a carbon-accounting SaaS.',
        description: `Joined Eliteware as a backend engineer and grew into the technical owner across multiple products. My day-to-day spans architecture decisions, deep performance work on hot paths, building LLM-powered features end to end, and being the primary technical voice in client conversations. I also lead the engineering teams shipping those products — driving direction, reviewing code, and mentoring junior engineers and interns.`,
        highlights: [
            {
                title: 'Architected a 9-service backend for Klimates (carbon-accounting SaaS)',
                body: 'Designed and led backend development for Klimates, splitting the platform into a 9-service microservices architecture across Node.js/Express and Python/FastAPI. The split powers automated emissions tracking and reporting at scale, with clean service boundaries that let multiple teams ship in parallel without stepping on each other.',
            },
            {
                title: 'Cut API response times by up to 89% on the analytics layer',
                body: 'Re-engineered PostgreSQL query design, indexing strategy, and data-access patterns across the analytics layer. The heaviest endpoints went from over 5 seconds to under 1 second — an ~89% reduction — with no change to the output contract. The fix unblocked dashboards that had been effectively unusable for larger customers.',
            },
            {
                title: 'Shipped an AI emission-classification engine (GPT-4o + RAG + Pinecone)',
                body: 'Built an AI-driven classification engine in Python/FastAPI that automatically maps raw transaction data to the correct emission categories. The pipeline combines OpenAI GPT-4o with a retrieval-augmented generation flow over a Pinecone vector index of category definitions and prior classifications, so every classification is grounded in retrieved context instead of free-form guessing.',
            },
            {
                title: 'Built a real-time EV charger control plane over OCPP / WebSocket',
                body: 'Engineered bidirectional communication between EV chargers and backend services using the OCPP protocol over persistent WebSocket connections. The system supports live charger monitoring, session tracking, and remote start/stop control — making the chargers controllable from the platform in real time instead of via slow polling.',
            },
            {
                title: 'Led cross-functional teams and owned client technical conversations',
                body: 'Took technical direction for multiple products in parallel — running code reviews, breaking ambiguous client requirements down into deliverable engineering work, and serving as the primary technical contact for clients on requirements and progress. Made the call on architecture, hiring inputs, and which trade-offs were worth taking.',
            },
            {
                title: 'Championed AI-assisted development across the engineering team',
                body: 'Integrated tools like Claude and Codex into the day-to-day engineering workflow and trained interns to apply them effectively for task automation, code generation, and review. The team now ships measurably faster on complex engineering work, with AI used as a force-multiplier rather than a novelty.',
            },
        ],
        techStack: [
            'Node.js',
            'Express',
            'Python',
            'FastAPI',
            'PostgreSQL',
            'Redis',
            'OpenAI GPT-4o',
            'Pinecone',
            'RAG',
            'WebSocket',
            'OCPP',
            'AWS',
            'Docker',
            'Microservices',
        ],
    },
    {
        slug: 'kavara-tech',
        title: 'Backend Developer',
        company: 'Kavara Tech',
        duration: 'May 2023 - Sep 2023',
        location: 'Noida, Uttar Pradesh',
        summary:
            'Backend developer on a cloud-applications team — shipped REST APIs, automated deployments, and raised code quality alongside senior engineers.',
        description: `Joined Kavara Tech as a backend developer working on cloud-based applications. The role was an early career proving ground: ship real features, own real bugs, and contribute directly to the engineering team's delivery roadmap rather than just learning on the sidelines.`,
        highlights: [
            {
                title: 'Designed and shipped backend features and REST APIs',
                body: 'Owned backend feature work and REST API design for cloud-based applications, contributing directly to the engineering team\'s delivery roadmap. Worked across the API surface from data modeling to endpoint implementation, with code that went straight into production releases.',
            },
            {
                title: 'Built automated deployment workflows that improved release reliability',
                body: 'Implemented server configuration and automated deployment workflows that streamlined the release process. The automation cut manual steps out of the release path and made builds noticeably more reliable, reducing the kind of last-minute surprises that used to slow shipping down.',
            },
            {
                title: 'Authored test cases and resolved production issues with senior engineers',
                body: 'Wrote test cases for new and existing features and worked alongside senior engineers to triage and resolve production issues. The combined effect was a measurable lift in code quality and a reduction in recurring bugs — fewer regressions making it back to the same parts of the codebase.',
            },
        ],
        techStack: [
            'Node.js',
            'REST APIs',
            'CI/CD',
            'Automated Deployment',
            'Server Configuration',
            'Testing',
        ],
    },
    {
        slug: 'functionup',
        title: 'Software Developer Intern',
        company: 'FunctionUp',
        duration: 'Sep 2022 - May 2023',
        location: 'Remote',
        summary:
            'Intensive, project-based first chapter — shipped real features across booking and e-commerce web apps while building a strong software-engineering foundation.',
        description: `My first hands-on chapter in software engineering. FunctionUp's program is intensive and project-based, which meant the work was real: ship features into real applications, with real expectations around code quality, version control, and review. I came out of it with a foundation in REST API design, relational data modeling, and version control that everything since has built on.`,
        highlights: [
            {
                title: 'Built and shipped features for booking and e-commerce web apps',
                body: 'Contributed across the stack — REST API design through database integration — on booking and e-commerce web applications. Worked on real codebases with real users in mind, not throwaway tutorial projects.',
            },
            {
                title: 'Built a software-engineering foundation through intensive project work',
                body: 'Developed a strong working understanding of REST API design, relational data modeling, and version control through deeply hands-on, project-based work. The fundamentals locked in here are the same ones I now use every day building production microservices.',
            },
        ],
        techStack: [
            'JavaScript',
            'Node.js',
            'REST APIs',
            'SQL',
            'Relational Data Modeling',
            'Git',
        ],
    },
];
