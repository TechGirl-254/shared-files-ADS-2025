# All's Well That Scales Well - MLOps Demo UI

A production-ready React frontend demonstrating scalable ML inference pipelines for the "All's Well That Scales Well" workshop.

## Overview

This application serves as an interactive demo for understanding MLOps principles, focusing on:
- **Sustainable data collection pipelines**
- **ETL pipelines for ML workloads**
- **Deployment pipelines for operational excellence**
- **Scalable infrastructure on Kubernetes**

## What It Does

Users interact with a simple form to submit their information (name, age, favorite superhero) and receive real-time ML predictions from a backend inference service. The app demonstrates:

- Real-time ML inference at scale
- Kubernetes-based deployment architecture
- Optimized frontend performance with caching and compression
- Production-ready nginx configuration
- Containerized deployment workflow

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Inline styles with gradient themes
- **Server**: Nginx (Alpine)
- **Container**: Docker multi-stage build
- **Deployment**: Kubernetes (EKS)

## Features

### Performance Optimizations
- Gzip compression enabled
- Aggressive browser caching for static assets
- Code splitting (vendor chunks)
- Minified production builds
- DNS prefetching for API calls

### Production Ready
- Multi-stage Docker builds
- Nginx reverse proxy configuration
- Health check endpoints
- Scalable Kubernetes deployment

## Valid Superhero Options

Users must select from the predefined list of 93 heroes including:
- Marvel: IronMan, CaptainAmerica, Thor, SpiderMan, BlackPanther, etc.
- DC: Batman, Superman, WonderWoman, Flash, Aquaman, etc.
- Actors: ChrisEvans, TomHolland, RyanReynolds, etc.

*Selecting an invalid hero demonstrates model constraints and data validation in ML pipelines.*

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Build

```bash
# Build the image
docker build -t mlops-demo-ui .

# Run locally
docker run -p 8080:80 mlops-demo-ui
```

## Deployment to EKS

```bash
# Build and tag
docker build -t your-registry/mlops-demo-ui:latest .

# Push to registry
docker push your-registry/mlops-demo-ui:latest

# Deploy to Kubernetes
kubectl apply -f k8s/

# Restart deployment
kubectl rollout restart deployment/ui-deployment
```

## Configuration

### Environment Variables
- API endpoint configured in `src/components/HeroForm.jsx`
- Default: `https://scale-api.wamatamuriu.org/submit-user-data`

### Nginx Configuration
- Gzip compression enabled
- 1-year cache for static assets
- 1-hour cache for HTML
- API proxy to backend service

## CI/CD Pipeline

### Automated Deployment Workflow

The project uses GitHub Actions for continuous deployment:

**Trigger**: Pull request to `main` from `dev` branch

**Pipeline Steps**:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies and build React app
4. Configure AWS credentials
5. Login to Amazon ECR
6. Build and tag Docker image
7. Push image to ECR
8. Trigger CD pipeline in staging repo

**Workflow File**: `.github/workflows/train-and-build.yaml`

### ETL Pipeline (Separate Repository)

The ETL pipeline runs on a schedule to collect and process training data:

- **Frequency**: Every 5 minutes (configurable)
- **Process**: Extract → Transform → Load to S3
- **Output**: Processed datasets for model training
- **Storage**: S3 bucket (`scale-etl-bucket-1`)

## Workshop Learning Objectives

This demo illustrates:

1. **Data Collection Pipeline**: User input → validation → API submission → Database
2. **ETL Pipeline**: Scheduled data extraction → transformation → S3 storage
3. **Training Pipeline**: Automated model training on new data
4. **Deployment Pipeline**: Docker → ECR → Kubernetes → Production
5. **Operational Excellence**: 
   - Automated CI/CD workflows
   - Infrastructure as Code
   - Monitoring and observability
   - Performance optimization
   - Error handling and user feedback
   - Scalable infrastructure on EKS

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── HeroForm.jsx      # Main form component
│   ├── App.jsx                # Root component
│   └── main.jsx               # Entry point
├── public/                    # Static assets
├── Dockerfile                 # Multi-stage build
├── nginx.conf                 # Production server config
├── vite.config.js             # Build configuration
└── package.json               # Dependencies
```

## Performance Metrics

- **Initial Load**: ~150KB (gzipped)
- **Time to Interactive**: < 2s (with caching)
- **Lighthouse Score**: 95+ (Performance)

## Troubleshooting

### UI loads slowly
- Clear browser cache (Ctrl+Shift+R)
- Check Network tab in DevTools
- Verify nginx is serving `/assets/` correctly

### API errors
- Verify backend service is running
- Check Kubernetes service DNS resolution
- Review nginx proxy configuration

## License

MIT

## Workshop Contact
Wamata Muriu