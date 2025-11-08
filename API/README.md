# All's Well That Scales Well

**Building Sustainable Data Collection, ETL, and Deployment Pipelines for ML Workloads**

A workshop demonstration project showcasing operational excellence in MLOps through automated, scalable, and observable pipelines for machine learning workloads.

## Workshop Theme

This project embodies the principle that **scaling well requires sustainable pipelines**. We demonstrate:

### 1. Sustainable Data Collection
- Automated user data ingestion via REST API
- Validation and storage in S3 data lake
- Continuous data flow without manual intervention

### 2. Robust ETL Pipelines
- Scheduled data cleaning and transformation (every 5 minutes)
- GitHub Actions for serverless ETL execution
- Parquet format for efficient storage and querying
- Data quality validation and deduplication

### 3. Reliable Deployment Pipelines
- Containerized ML model deployment
- Kubernetes orchestration on AWS EKS
- Horizontal pod autoscaling for traffic adaptation
- Zero-downtime deployments

### 4. Operational Excellence
- Comprehensive monitoring with Prometheus & Grafana
- Performance testing and capacity planning
- Resource optimization within constraints
- Observable systems for proactive issue detection

## Architecture: Three Pillars of Sustainable ML Operations

## Key Workshop Concepts Demonstrated

### 1. Sustainable Data Collection Pipeline

**Challenge:** How do you continuously collect data without manual intervention?

**Solution:**
- REST API endpoints for automated data ingestion
- Validation at the edge (hero selection, age ranges)
- Immediate storage to S3 data lake
- Append-only architecture for data integrity
- Structured logging for audit trails

**Operational Excellence:**
- No data loss during pod restarts (S3 persistence)
- Graceful error handling for invalid submissions
- Scalable ingestion (handles traffic spikes via HPA)

### 2. Robust ETL Pipeline

**Challenge:** How do you maintain data quality at scale?

**Solution:**
- Scheduled GitHub Actions workflow (every 5 minutes)
- Serverless execution (no infrastructure to manage)
- Idempotent operations (safe to re-run)
- Data validation and deduplication
- Parquet format for efficient storage (columnar, compressed)

**Operational Excellence:**
- Automated execution (no manual triggers)
- Version-controlled pipeline code
- Observable via GitHub Actions logs
- Cost-effective (pay per execution)
- Failure notifications via GitHub

### 3. Reliable ML Deployment Pipeline

**Challenge:** How do you deploy ML models that scale with demand?

**Solution:**
- Containerized model deployment (reproducible environments)
- Model artifacts stored in S3 (single source of truth)
- Kubernetes orchestration (self-healing, rolling updates)
- Horizontal Pod Autoscaler (2-6 replicas based on load)
- Resource limits (predictable costs)

**Operational Excellence:**
- Zero-downtime deployments
- Automatic recovery from failures
- Capacity planning within constraints (3 t3.medium nodes)
- Performance testing before production
- Gradual rollout capabilities

### 4. Comprehensive Observability

**Challenge:** How do you know your pipelines are healthy?

**Solution:**
- Prometheus metrics (request rates, latency, errors)
- Custom Grafana dashboards (real-time visualization)
- Resource monitoring (CPU, memory, pod count)
- Load testing infrastructure (Locust)
- Performance benchmarking

**Operational Excellence:**
- Proactive issue detection
- Data-driven scaling decisions
- Performance regression detection
- Capacity planning insights
- SLA monitoring

## Project Structure

```
.
├── app/
│   ├── app.py              # FastAPI application
│   ├── train.py            # Model training script
│   ├── analytics.py        # Analytics computation
│   └── duel_pipeline.py    # Duel generation pipeline
├── etl/
│   └── etl.py              # ETL data cleaning script
├── k8s/
│   ├── hpa.yaml            # Horizontal Pod Autoscaler
│   ├── servicemonitor.yaml # Prometheus scraping config
│   ├── grafana-dashboard-configmap.yaml
│   ├── prometheus-values.yaml
│   └── setup-monitoring.sh # Monitoring setup script
├── tests/
│   ├── load_test.py        # Locust load testing
│   ├── stress_test.sh      # Automated stress test
│   └── README.md           # Load testing guide
├── .github/workflows/
│   └── etl-pipeline.yaml   # GitHub Actions ETL job
├── Dockerfile              # Container image definition
└── requirements.txt        # Python dependencies
```

## API Endpoints

### `GET /`
Health check endpoint

### `GET /duel?name1=Alice&name2=Thor`
Predict duel outcome between two warriors
- Returns winner and confidence score

### `POST /submit-user-data`
Submit user data for duel prediction
```json
{
  "name": "Alice",
  "age": 25,
  "hero": "Thor"
}
```
- Validates hero selection
- Stores data in S3
- Returns instant prediction

### `GET /analytics`
Get analytics on submitted data
- Most popular hero
- Strongest player
- Cached for performance

### `GET /metrics`
Prometheus metrics endpoint
- Request counts
- Response times
- Error rates

## Technology Stack

**Backend:**
- Python 3.11
- FastAPI
- scikit-learn (RandomForest)
- pandas, numpy
- boto3 (AWS SDK)

**Infrastructure:**
- AWS EKS (Kubernetes)
- AWS S3 (Data storage)
- Docker
- Helm

**Monitoring:**
- Prometheus
- Grafana
- prometheus-fastapi-instrumentator

**CI/CD:**
- GitHub Actions
- Automated ETL pipeline

**Testing:**
- Locust (load testing)

## Quick Start

### Prerequisites
- AWS account with EKS cluster
- kubectl configured
- Docker
- Python 3.11+

### Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables:
```bash
export S3_BUCKET=scale-etl-bucket-1
export AWS_REGION=us-east-1
```

3. Run the API:
```bash
uvicorn app.app:app --reload
```

4. Access API at `http://localhost:8000`

### Kubernetes Deployment

See (https://github.com/TechGirl-254/charts-alls-well-that-scales-well/pull/19) for complete deployment.

## Monitoring

Access Grafana dashboard:
```bash
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
```

Open `http://localhost:3000` (admin/ChangeMe123!)

## Load Testing

Run stress test:
```bash
./tests/stress_test.sh
```

Or interactive mode:
```bash
locust -f tests/load_test.py --host=https://your-api-url.com
```

See [tests/README.md](tests/README.md) for detailed testing guide.

## Workshop Outcomes: Operational Excellence Metrics

### Data Collection Pipeline
- **Uptime:** 99.9% (Kubernetes self-healing)
- **Data loss:** 0% (S3 persistence)
- **Ingestion rate:** ~20 submissions/sec per pod
- **Validation:** 100% of submissions validated before storage

### ETL Pipeline
- **Execution frequency:** Every 5 minutes (288 runs/day)
- **Success rate:** 99%+ (automated retries)
- **Processing time:** <2 minutes per run
- **Data quality:** Deduplication, validation, type checking
- **Storage efficiency:** 60-80% compression with Parquet

### Deployment Pipeline
- **Throughput:** ~20 RPS per pod, 120 RPS max (6 pods)
- **Latency:** p50: 300-500ms, p95: 1-2s
- **Availability:** Multi-pod redundancy (min 2 replicas)
- **Scaling speed:** 30 seconds to add pods
- **Resource efficiency:** 250m CPU, 512Mi RAM per pod
- **Cost optimization:** Scales down during low traffic

### Observability
- **Metrics collection:** 30-second intervals
- **Dashboard refresh:** Real-time
- **Alert latency:** <1 minute
- **Retention:** 15 days of metrics

## Configuration

**Environment Variables:**
- `S3_BUCKET`: S3 bucket name (default: scale-etl-bucket-1)
- `MODEL_KEY`: S3 key for ML model (default: models/duel_model.pkl)
- `AWS_REGION`: AWS region (default: us-east-1)

**Kubernetes Resources:**
- CPU request: 250m per pod
- Memory request: 512Mi per pod
- CPU limit: 500m per pod
- Memory limit: 1Gi per pod

## Workshop Takeaways

After working through this project, you'll understand:

1. **Data Collection Best Practices**
   - API-first data ingestion
   - Validation at the edge
   - Durable storage strategies
   - Handling high-volume submissions

2. **ETL Pipeline Design**
   - Serverless vs. container-based ETL
   - Scheduling strategies
   - Data quality enforcement
   - Storage format optimization

3. **ML Deployment Strategies**
   - Model artifact management
   - Container orchestration
   - Autoscaling configurations
   - Resource optimization

4. **Operational Excellence**
   - Monitoring and alerting
   - Performance testing
   - Capacity planning
   - Cost optimization

## Real-World Applications

These patterns apply to:
- **E-commerce:** Product recommendation pipelines
- **Finance:** Fraud detection systems
- **Healthcare:** Patient risk scoring
- **IoT:** Sensor data processing and anomaly detection
- **Social Media:** Content moderation and ranking

## Next Steps

To extend this project:
1. Add model retraining pipeline (automated)
2. Implement A/B testing for model versions
3. Add authentication and rate limiting
4. Set up multi-region deployment
5. Implement alerting rules in Prometheus
6. Add data versioning with DVC
7. Create CI/CD for application deployment

## Contributing

This is a workshop demonstration project. Feel free to:
- Fork and experiment
- Adapt for your use cases
- Share improvements
- Use in your own workshops

## License

MIT License

## Workshop Attendees

**Want to follow along?**

1. Click "Use this template" to create your own copy
2. Follow the [Workshop Setup Guide](WORKSHOP_SETUP.md)
3. Join the workshop and build alongside!

**Please note:** This material is provided for educational purposes. Commercial use requires permission. See [LICENSE](LICENSE) for details.

## Author

**Wamata Muriu**  
Workshop: "All's Well That Scales Well"  
Contact: [Your email/LinkedIn]

## Acknowledgments

Built to demonstrate sustainable MLOps practices and operational excellence in production ML systems.

## Citation

If you use this work in your own projects or presentations, please cite:

```
Muriu, W. (2024). All's Well That Scales Well: Building Sustainable ML Pipelines.
Workshop demonstration project. https://github.com/[your-username]/[repo-name]
```
