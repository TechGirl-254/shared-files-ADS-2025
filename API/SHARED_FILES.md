# Workshop Shared Files

These files are provided for the "All's Well That Scales Well" workshop.

## Files Included

1. **`.github/workflows/etl-pipeline.yaml`** - Scheduled ETL pipeline
2. **`.github/workflows/train-and-build.yaml`** - CI/CD pipeline for model training
3. **`Dockerfile`** - Container image definition
4. **`README.md`** - Project documentation
5. **`etl/etl.py`** - ETL data processing logic

## Setup Instructions

Before using these files:

1. Update S3 bucket names to match yours
2. Add GitHub Secrets (AWS credentials)
3. Update ECR repository name
4. Implement remaining application code (app.py, train.py, etc.)

See README.md for full setup instructions.

## Author

Wamata Muriu - Workshop: "All's Well That Scales Well"
