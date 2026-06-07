import { useState } from 'react';

const FEATURE_DATA = [
  {
    id: 'docker',
    icon: 'bi-box-seam',
    title: 'Docker Isolation',
    tag: 'DevOps & Containers',
    desc: 'Run your frontend client and Express services inside isolated container tasks, ensuring environment parity from commit to deploy.',
    techDetails: 'TechFlow uses multi-stage builds to compile React assets, serving them via an Nginx alpine container, while isolated Node runtime images serve API routes.',
    codeTitle: 'Multi-Stage Dockerfile (Frontend example)',
    codeLanguage: 'dockerfile',
    code: `# Stage 1: Build static assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with light Nginx server
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
  },
  {
    id: 'gitops',
    icon: 'bi-git',
    title: 'Git-Ops CI/CD',
    tag: 'Continuous Integration',
    desc: 'Connect repository hooks to validate commits automatically. Triggers tests, linters, and checks on every push request.',
    techDetails: 'Our pre-configured GitHub Actions workflow runs unit tests, lints stylesheets/code, builds production bundles, and updates AWS container instances.',
    codeTitle: 'GitHub Actions Deployment Pipeline (.github/workflows/deploy.yml)',
    codeLanguage: 'yaml',
    code: `name: Staging Deployment

on:
  push:
    branches: [ develop ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`
  },
  {
    id: 'routing',
    icon: 'bi-cloud-upload',
    title: 'Multi-Region Routing',
    tag: 'AWS Cloud Architecture',
    desc: 'Host Docker containers serverlessly on AWS ECR & Fargate. Route traffic globally using load balancers.',
    techDetails: 'An Application Load Balancer terminates SSL, routing requests starting with /api/* directly to backend instances and everything else to static storage.',
    codeTitle: 'AWS CloudFormation ALB Routing Setup snippet',
    codeLanguage: 'yaml',
    code: `ApiRoutingRule:
  Type: AWS::ElasticLoadBalancingV2::ListenerRule
  Properties:
    Actions:
      - Type: forward
        TargetGroupArn: !Ref BackendTargetGroup
    Conditions:
      - Field: path-pattern
        Values:
          - /api/*
    ListenerArn: !Ref LoadBalancerListener
    Priority: 1`
  },
  {
    id: 'vite',
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Vite Dev Engine',
    tag: 'Frontend Bundler',
    desc: 'Boost developer output with instant hot module replacement. Compiled assets build into highly optimized static index bundles.',
    techDetails: 'Using native ES modules to compile code on-demand, Vite bypasses full-dependency graph compiles, delivering sub-second HMR updates.',
    codeTitle: 'Vite Compiler Configuration (vite.config.js)',
    codeLanguage: 'javascript',
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600
  }
});`
  },
  {
    id: 'env-maps',
    icon: 'bi-shield-lock',
    title: 'Secure Environment Maps',
    tag: 'Security & Variables',
    desc: 'Validate environmental secrets out-of-the-box before compiling, avoiding production system token leaks.',
    techDetails: 'A dedicated env module runs schema assertions on process environment keys during startup, throwing immediate exceptions if tokens are corrupted.',
    codeTitle: 'Dotenv Schema Validation (backend/config/env.js)',
    codeLanguage: 'javascript',
    code: `const dotenv = require('dotenv');
const fs = require('fs');

const envType = process.env.NODE_ENV || 'development';
let envPath = path.resolve(__dirname, '..', \`.env.\${envType}\`);

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(__dirname, '..', '.env');
}

dotenv.config({ path: envPath });
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI configuration is missing!");
}`
  },
  {
    id: 'mvc',
    icon: 'bi-diagram-3',
    title: 'Decoupled MVC Layout',
    tag: 'Clean Code Architecture',
    desc: 'Clean Node/Express backend folder structure separating router files, validators, controllers, and error catchers.',
    techDetails: 'Our decoupled design isolates logic into middleware layers. Routes direct requests through express-validation schemas into lean controller functions.',
    codeTitle: 'Backend Directory Mapping Tree',
    codeLanguage: 'text',
    code: `backend/
├── config/           # Dotenv configuration mapping
├── controllers/      # Handles business controller actions
├── middleware/       # JWT auth & error interceptors
├── models/           # Mongoose DB schema definitions
├── routes/           # REST endpoint routing definitions
├── services/         # Integrates third-party service logic
├── utils/            # Async helpers & responses
└── validators/       # Input parameter validation schemas`
  }
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState(FEATURE_DATA[0].id);
  const activeFeature = FEATURE_DATA.find((f) => f.id === activeTab);

  return (
    <section className="page-fade-in section-black position-relative py-5" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      {/* Decorative Orbs */}
      <div className="glow-orb" style={{ top: '10%', right: '5%', width: '450px', height: '450px', background: 'rgba(99,102,241,0.12)' }}></div>
      <div className="glow-orb" style={{ bottom: '15%', left: '5%', width: '350px', height: '350px', background: 'rgba(56,189,248,0.08)' }}></div>

      <div className="container position-relative z-1 py-5">
        {/* Header */}
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            ENGINEERING BLUEPRINTS
          </h6>
          <h1 className="display-5 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1.5px' }}>
            Platform <span className="text-gradient">Capabilities</span>
          </h1>
          <p className="text-gray">Explore the modular layout, Docker files, and deployment automation setups underpinning TechFlow.</p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="row g-4 mt-2">
          {/* Tabs Menu */}
          <div className="col-lg-4">
            <div className="saas-card p-3 d-flex flex-column gap-2">
              {FEATURE_DATA.map((feat) => {
                const isActive = feat.id === activeTab;
                return (
                  <button
                    key={feat.id}
                    className={`btn text-start p-3 d-flex align-items-center gap-3 transition-smooth rounded-3 ${
                      isActive ? 'btn-saas-primary text-black' : 'btn-saas-secondary text-white'
                    }`}
                    onClick={() => setActiveTab(feat.id)}
                    style={{ border: isActive ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className={`d-flex align-items-center justify-content-center rounded-3`}
                      style={{
                        width: '38px',
                        height: '38px',
                        background: isActive ? 'rgba(0,0,0,0.1)' : 'rgba(129,140,248,0.05)',
                        border: isActive ? 'none' : '1px solid rgba(129,140,248,0.15)',
                        fontSize: '1.1rem'
                      }}
                    >
                      <i className={`bi ${feat.icon} ${isActive ? 'text-black' : 'text-gradient'}`}></i>
                    </div>
                    <div>
                      <div className="fw-bold small">{feat.title}</div>
                      <div className={`small ${isActive ? 'text-dark' : 'text-gray'}`} style={{ fontSize: '0.75rem' }}>
                        {feat.tag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Content Display */}
          <div className="col-lg-8">
            <div className="saas-card p-4 p-md-5 h-100 d-flex flex-column">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                  style={{ width: '48px', height: '48px', border: '1px solid rgba(129,140,248,0.2)' }}
                >
                  <i className={`bi ${activeFeature.icon} fs-4 text-gradient`}></i>
                </div>
                <div>
                  <span className="text-gradient fw-bold small text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                    {activeFeature.tag}
                  </span>
                  <h3 className="text-white fw-bold mb-0">{activeFeature.title}</h3>
                </div>
              </div>

              <p className="text-white fs-6 mb-3" style={{ lineHeight: '1.6' }}>
                {activeFeature.desc}
              </p>
              <p className="text-gray small mb-4 lh-relaxed">
                {activeFeature.techDetails}
              </p>

              {/* Code Sandbox Viewport */}
              <div className="flex-grow-1 d-flex flex-column mt-2">
                <div
                  className="px-3 py-2 bg-black bg-opacity-40 rounded-top border border-bottom-0 d-flex align-items-center justify-content-between"
                  style={{ borderColor: 'var(--border-muted)' }}
                >
                  <span className="text-gray font-monospace small" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-file-code me-2"></i>
                    {activeFeature.codeTitle}
                  </span>
                  <div className="d-flex gap-1.5">
                    <span className="rounded-circle bg-danger bg-opacity-80" style={{ width: '8px', height: '8px' }}></span>
                    <span className="rounded-circle bg-warning bg-opacity-80" style={{ width: '8px', height: '8px' }}></span>
                    <span className="rounded-circle bg-success bg-opacity-80" style={{ width: '8px', height: '8px' }}></span>
                  </div>
                </div>
                <pre
                  className="p-3 bg-black bg-opacity-20 rounded-bottom border border-top-0 flex-grow-1 font-monospace text-gray mb-0"
                  style={{
                    borderColor: 'var(--border-muted)',
                    fontSize: '0.8rem',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    lineHeight: '1.5'
                  }}
                >
                  <code>{activeFeature.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
