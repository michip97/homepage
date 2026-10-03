#!/bin/bash

# Script to gather Docker logs for debugging Traefik/Deployment issues
# Run this on your VPS

echo "=================================================="
echo "    Gathering Logs for Troubleshooting            "
echo "=================================================="

# Create a log file
LOG_FILE="portfolio_debug_$(date +%s).log"
touch $LOG_FILE

{
  echo "--- DOCKER PROCESSES ---"
  docker ps -a
  echo ""

  echo "--- LETSENCRYPT DIRECTORY ---"
  ls -la /opt/portfolio/letsencrypt || echo "Directory not found."
  echo ""

  echo "--- TRAEFIK LOGS ---"
  docker logs traefik-prod --tail 100
  echo ""

  echo "--- BACKEND LOGS ---"
  docker logs portfolio-backend-prod --tail 50
  echo ""

  echo "--- FRONTEND LOGS ---"
  docker logs portfolio-frontend-prod --tail 50
  echo ""

} > $LOG_FILE 2>&1

echo "Logs have been gathered and saved to: $LOG_FILE"
echo "Please copy the contents of $LOG_FILE and share it here so I can analyze it."
echo "You can read the file by typing: cat $LOG_FILE"
