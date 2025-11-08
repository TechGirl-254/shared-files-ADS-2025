# ---- builder ----
FROM python:3.11-slim AS builder
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /build

# system deps needed for many python wheels (adjust if you know exact libs)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# copy python deps
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip wheel --no-cache-dir --wheel-dir /build/wheels -r requirements.txt

# ---- runtime ----
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_DIR=/app \
    PORT=8000

# create non-root user
RUN groupadd -r app && useradd --no-log-init -r -g app app

WORKDIR ${APP_DIR}

# copy wheels and install
COPY --from=builder /build/wheels /wheels
RUN pip install --no-cache /wheels/* \
  && rm -rf /wheels

# copy app
COPY . ${APP_DIR}

# ensure app files are owned by non-root user
RUN chown -R app:app ${APP_DIR}

USER app

EXPOSE ${PORT}

# uvicorn with a small set of recommended flags
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1", "--loop", "uvloop"]
