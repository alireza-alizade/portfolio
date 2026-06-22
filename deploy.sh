#!/bin/bash

# Script to build Docker images, save them, and deploy to server
# Usage: ./deploy.sh
#   Deploys to server 193.93.169.36 using hardcoded credentials

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
SERVER_USER="ubuntu"
SERVER_PASSWORD="Inhjum#45jkl;"
SERVER_HOST="193.93.169.36"
SERVER_PATH="/home/ubuntu/portfolio"

print_info "Target server: $SERVER_HOST"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
if ! command_exists docker; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command_exists ssh; then
    print_error "SSH is not installed. Please install SSH client first."
    exit 1
fi

if ! command_exists scp; then
    print_error "SCP is not installed. Please install SCP client first."
    exit 1
fi

# Function to build and save Docker images
build_and_save_images() {
    print_info "Building Docker images..."
    
    # Build images using docker compose
    docker compose build --no-cache
    
    print_info "Saving Docker images to tar files..."
    
    # Save backend image
    docker save -o backend.tar portfolio-backend:latest
    print_info "Saved backend image to backend.tar"
    
    # Save frontend image
    docker save -o frontend.tar portfolio-frontend:latest
    print_info "Saved frontend image to frontend.tar"
}

# Function to deploy images to server
deploy_to_server() {
    print_info "Deploying images to server..."
    
    # Create remote directory if it doesn't exist
    ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_HOST" "mkdir -p $SERVER_PATH"
    
    # Copy tar files to server
    scp -o StrictHostKeyChecking=no backend.tar "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
    scp -o StrictHostKeyChecking=no frontend.tar "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
    
    print_info "Images deployed to server at $SERVER_PATH"
}

# Function to cleanup local tar files
cleanup() {
    print_info "Cleaning up local tar files..."
    rm -f backend.tar frontend.tar
    print_info "Local tar files removed."
}

# Function to show help
    show_help() {
        echo "Usage: $0 [server-ip] [--skip-build] [--help]"
        echo ""
        echo "Arguments:"
        echo "  server-ip    IP address of the target server (required)"
        echo "  --skip-build Skip building Docker images (use existing tar files)"
        echo "  --help       Show this help message"
        echo ""
        echo "This script will:"
        echo "  1. Build Docker images using docker compose (unless --skip-build is used)"
        echo "  2. Save images to tar files using docker save (unless --skip-build is used)"
        echo "  3. SSH to the server and copy tar files"
        echo "  4. Clean up local tar files"
        echo ""
        echo "Prerequisites:"
        echo "  - Docker installed and running (unless --skip-build is used)"
        echo "  - SSH client with password authentication"
        echo "  - SCP client"
        echo "  - Server with SSH access configured for user 'ubuntu'"
        echo ""
        echo "Note: The server password 'Inhjum#45jkl;' is hardcoded in this script."
        echo "      For production use, consider using SSH keys instead."
    }

# Check if help is requested
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    show_help
    exit 0
fi

# Check if skip-build flag is provided
SKIP_BUILD=false
if [[ "$2" == "--skip-build" || "$3" == "--skip-build" ]]; then
    SKIP_BUILD=true
fi

# Main execution
print_info "Starting deployment process..."

# Build and save images (unless skip-build is used)
if [[ "$SKIP_BUILD" == false ]]; then
    build_and_save_images
else
    print_info "Skipping build step (--skip-build flag provided)"
    # Check if tar files exist
    if [[ ! -f "backend.tar" || ! -f "frontend.tar" ]]; then
        print_error "Tar files not found. Please run without --skip-build or ensure backend.tar and frontend.tar exist."
        exit 1
    fi
fi

# Deploy to server
deploy_to_server

# Cleanup local files
cleanup

print_info "Deployment completed successfully!"
print_info "You can now import the images on the server using:"
print_info "  docker load -i backend.tar"
print_info "  docker load -i frontend.tar"
