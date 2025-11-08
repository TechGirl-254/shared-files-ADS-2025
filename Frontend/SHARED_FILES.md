# Workshop Shared Files

These files are provided for the "All's Well That Scales Well" workshop.

## Files Included

1. **`.github/workflows/train-and-build.yaml`** - CI/CD pipeline for UI deployment
2. **`src/components/HeroForm.jsx`** - React form component with hero selector
3. **`Dockerfile`** - Multi-stage container image definition
4. **`nginx.conf`** - Production nginx configuration with optimizations
5. **`README.md`** - Complete project documentation

## What These Files Demonstrate

### CI/CD Pipeline (`train-and-build.yaml`)
- Automated build and deployment on PR
- Docker image building and pushing to ECR
- Integration with Kubernetes deployment
- GitOps workflow with repository dispatch

### Frontend Component (`HeroForm.jsx`)
- React hooks for state management
- API integration for ML inference
- Interactive UI with 93+ hero options
- Error handling and loading states

### Container Setup (`Dockerfile`)
- Multi-stage build for optimization
- Node.js build stage
- Nginx production stage
- Minimal final image size

### Nginx Configuration (`nginx.conf`)
- Gzip compression for performance
- Aggressive caching strategies
- API proxy configuration
- Static asset optimization

## Setup Instructions

Before using these files:

1. **Update AWS Configuration**
   - Set GitHub Secrets: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
   - Update ECR repository name in workflow

2. **Update API Endpoint**
   - Modify the API URL in `HeroForm.jsx` to match your backend

3. **Complete the Application**
   - Add remaining React components (`App.jsx`, `main.jsx`)
   - Add `package.json` with dependencies
   - Add `vite.config.js` for build configuration
   - Add `index.html` as entry point

4. **Deploy to Kubernetes**
   - Create Kubernetes manifests (deployment, service, ingress)
   - Configure DNS for your domain
   - Set up TLS certificates

See `README.md` for full setup instructions and architecture details.

## Workshop Topics Covered

- **Data Collection Pipelines**: User input validation and submission
- **ETL Pipelines**: Data transformation for ML workloads
- **Deployment Pipelines**: Automated CI/CD with GitHub Actions
- **Operational Excellence**: Performance optimization, monitoring, scalability

## Author

Wamata Muriu - Workshop: "All's Well That Scales Well"

## License

MIT
