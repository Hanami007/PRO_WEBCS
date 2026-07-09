# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
ARG NODE_VERSION=24-slim

FROM node:${NODE_VERSION} AS dependencies
# Set working directory
WORKDIR /app

# Enable pnpm via corepack

COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies for build)
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build Stage
# ============================================

FROM node:${NODE_VERSION} AS builder

WORKDIR /app


# Copy installed dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy project source
COPY . .

ENV NODE_ENV=production

# Build NestJS application
RUN corepack enable pnpm && pnpm build

# --- Production Stage ---
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production

# Copy only required files for production
COPY --from=builder --chown=node:node /app/healthcheck.js ./healthcheck.js
COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/pnpm-lock.yaml ./

# Disable for faster image build
# Apply strict permissions: Make everything read-only (a-w) and executable (+x)
# RUN chmod -R a-w+x .

# Create files directory
RUN mkdir -p /app/files && \
    chown -R node:node /app/files && \
    chmod 775 /app/files

# Switch to non-root user for security
USER node

# Expose application port (must match NestJS PORT env or default)
EXPOSE 4000

# Docker health check:
# - Runs every 30s
# - Waits 30s before starting checks (gives app time to boot)
# - Fails after 3 consecutive errors
# - If healthcheck.js exits with non-zero, container becomes "unhealthy"
#
# healthcheck.js should call http://localhost:${PORT}/health
# and exit(0) on 200, exit(1) otherwise.
HEALTHCHECK --interval=30s --timeout=3s --retries=3 --start-period=60s \
    CMD ["node", "healthcheck.js"]

# Start NestJS application
CMD ["node", "dist/main.js"]
