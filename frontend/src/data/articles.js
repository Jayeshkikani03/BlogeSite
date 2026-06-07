export const articles = [
  {
    slug: 'zero-downtime-ecs-fargate',
    tag: 'DevOps',
    title: 'Zero-Downtime ECS Fargate Rolling Deployments',
    desc: 'Learn how to configure AWS ECS task definitions and ALB health checks to achieve seamless zero-downtime container rollouts.',
    date: 'Jun 12, 2025',
    readTime: '6 min read',
    icon: 'bi-cloud-upload',
    content: `## Overview
Zero-downtime deployments ensure your application stays available during every release cycle. AWS ECS Fargate combined with an ALB makes this achievable with minimal configuration.

## Rolling Update Strategy
Set your ECS service deployment configuration with minimumHealthyPercent: 100 and maximumPercent: 200. This ensures ECS launches new tasks before terminating old ones — keeping at least 100% capacity live throughout the deployment window.

## Health Check Configuration
Configure your ALB target group health check to point at /api/health with a 2xx expected response. ECS will only route traffic to tasks that pass this check.

## Deployment Flow
1. Push new image to AWS ECR
2. GitHub Actions triggers aws ecs update-service --force-new-deployment
3. ECS launches new tasks, waits for ALB health checks to pass
4. Connection draining removes old tasks gracefully`
  },
  {
    slug: 'multi-stage-dockerfiles',
    tag: 'Docker',
    title: 'Multi-Stage Dockerfiles for Node + React Apps',
    desc: 'Reduce production image sizes by 70% using multi-stage builds — separate compile and serve stages for optimal performance.',
    date: 'Jun 5, 2025',
    readTime: '5 min read',
    icon: 'bi-box-seam',
    content: `## Why Multi-Stage Builds?
A standard single-stage Dockerfile for a React app ships the entire node_modules build toolchain into your production image — often 600MB+. Multi-stage builds separate the compile environment from the serve environment.

## Frontend Pattern
Stage 1 (builder): Install deps, run npm run build. Stage 2 (serve): Copy /app/dist into nginx:alpine image. Final image is ~28MB vs ~620MB single-stage.

## Backend Pattern
Use node:20-alpine, run npm ci --only=production to exclude devDependencies. This reduces image size from ~380MB to ~95MB.

## Result
The final Nginx image contains only static HTML/CSS/JS — no Node.js runtime at all. Backend ships only production code and dependencies.`
  },
  {
    slug: 'github-actions-ecr',
    tag: 'CI/CD',
    title: 'GitHub Actions: Build, Tag and Push to AWS ECR',
    desc: 'A complete walkthrough of setting up automated Docker image pipelines from GitHub to Elastic Container Registry.',
    date: 'May 28, 2025',
    readTime: '8 min read',
    icon: 'bi-git',
    content: `## Pipeline Overview
GitHub Actions automates the full journey from code push to deployed container on every merge to main.

## Required GitHub Secrets
Set these in repository Settings → Secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, ECR_REGISTRY.

## Key Steps
1. Configure AWS credentials using aws-actions/configure-aws-credentials
2. Login to ECR using aws-actions/amazon-ecr-login
3. Build and tag Docker images with the commit SHA
4. Push to ECR registry
5. Trigger ECS rolling deploy with aws ecs update-service --force-new-deployment

## Tagging Strategy
Tag images with both latest and the commit SHA. This allows rollback to any specific revision by updating the ECS task definition to point at the SHA-tagged image.`
  },
  {
    slug: 'environment-variable-isolation',
    tag: 'Security',
    title: 'Environment Variable Isolation in Vite + Express',
    desc: 'How TechFlow prevents secret leaks using VITE_ prefix filtering and server-side dotenv environment segregation.',
    date: 'May 20, 2025',
    readTime: '4 min read',
    icon: 'bi-shield-lock',
    content: `## The Problem
Frontend bundlers like Vite inline environment variables at build time. If you accidentally expose a database URI or JWT secret via a VITE_ prefixed variable, it becomes readable in the browser source code.

## Vite Prefix Filter
Vite only exposes variables prefixed with VITE_ to the client bundle. All others are stripped at build time. VITE_API_URL is safe to expose. MONGODB_URI and JWT_SECRET must never use the VITE_ prefix.

## Backend Strategy
TechFlow loads environment-specific files based on NODE_ENV — .env.development or .env.production. This keeps secrets in separate files that are never committed to version control.

## Docker Build Args
Pass VITE_API_URL as a Docker build argument so the correct API URL is inlined at image build time per environment without leaking any server-side secrets.`
  },
  {
    slug: 'route53-alb-path-routing',
    tag: 'AWS',
    title: 'Route 53 + ALB: Path-Based Routing for Microservices',
    desc: 'Route /api/* to Express containers and /* to Nginx static assets using a single Application Load Balancer.',
    date: 'May 14, 2025',
    readTime: '7 min read',
    icon: 'bi-diagram-3',
    content: `## Architecture Overview
A single AWS Application Load Balancer acts as the entry point for all traffic. Path-based routing rules direct requests to different ECS target groups based on the URL prefix.

## Listener Rules
Priority 1: Path /api/* → Backend ECS tasks (port 5000). Priority 2: Default → Frontend Nginx tasks (port 80).

## Nginx SPA Config
Use try_files $uri $uri/ /index.html so React Router handles all client-side navigation correctly — the ALB only needs to serve index.html for any non-API path.

## Route 53 Setup
Create an A record (Alias) pointing your domain to the ALB DNS name. AWS Certificate Manager handles HTTPS/SSL termination at the ALB — no SSL config needed inside your containers.

## Security Groups
ALB: Allow inbound 80/443 from 0.0.0.0/0. Backend tasks: Allow port 5000 only from the ALB security group. Frontend tasks: Allow port 80 only from the ALB security group.`
  },
  {
    slug: 'custom-hooks-pattern',
    tag: 'React',
    title: 'Custom Hooks Pattern: useApi, useToast and Beyond',
    desc: 'Clean architecture patterns for managing async API state, global notifications and form logic with reusable React hooks.',
    date: 'May 7, 2025',
    readTime: '5 min read',
    icon: 'bi-braces',
    content: `## Why Custom Hooks?
React custom hooks extract stateful logic from components into reusable functions. TechFlow uses three core hooks that cover the majority of UI interaction patterns.

## useApi
Wraps any async API function with unified loading, data, and error state. Returns a request function that can be called with any arguments and automatically manages the loading lifecycle.

## useToast
Consumes ToastContext and exposes showSuccess and showError helpers. Any component can trigger global notifications without prop drilling.

## useContactForm
Combines local field validation, server error parsing, submission state, and a 30-second rate-limiting cooldown in one reusable hook consumed by both ContactSection and ChatWidget.

## Key Benefits
Components stay as pure UI renderers. Business logic is testable in isolation. Hooks compose cleanly without circular dependencies.`
  }
];

export const tagColors = {
  DevOps: 'text-gradient',
  Docker: 'text-gradient-cyan',
  'CI/CD': 'text-warning',
  Security: 'text-danger',
  AWS: 'text-gradient',
  React: 'text-gradient-cyan'
};
