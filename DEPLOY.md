# Docker Image Deployment Script

This script automates the process of building Docker images, saving them to tar files, and deploying them to a remote server.

## Overview

The script performs the following steps:
1. Builds Docker images using `docker compose build --no-cache`
2. Saves images to tar files using `docker save`
3. SSHs to the target server and copies the tar files
4. Cleans up local tar files

## Usage

### Basic Usage
```bash
./deploy.sh
```

The script will use the configured server IP (193.93.169.36) directly.

### Help
```bash
./deploy.sh --help
./deploy.sh -h
```

## Configuration

The script uses the following configuration:

- **Server User**: `ubuntu`
- **Server Password**: `Inhjum#45jkl;` (hardcoded for convenience)
- **Server IP**: `193.93.169.36`
- **Server Path**: `/home/ubuntu/portfolio`

## Prerequisites

Before running this script, ensure you have:

1. **Docker installed and running** on the local machine
2. **SSH client** with password authentication configured
3. **SCP client** installed
4. **Target server** (193.93.169.36) with SSH access configured for user `ubuntu`

## Security Notes

⚠️ **Security Warning**: This script uses a hardcoded password in plain text. For production use, consider:

- Using SSH key-based authentication instead of passwords
- Storing credentials in environment variables or a secure configuration file
- Using a secrets management solution

## Example Workflow

```bash
# 1. Make the script executable
chmod +x deploy.sh

# 2. Run the script (uses 193.93.169.36 by default)
./deploy.sh

# 3. On the server, load the images
ssh ubuntu@193.93.169.36 << 'EOF'
cd /home/ubuntu/portfolio
docker load -i backend.tar
docker load -i frontend.tar
EOF
```

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Ensure SSH is enabled on the target server
   - Check if the server IP is correct
   - Verify firewall settings
   - Confirm the user `ubuntu` exists on the server

2. **Docker Command Failed**
   - Ensure Docker is running locally
   - Check if you have permission to run Docker commands
   - Verify the docker-compose.yml file is present and valid

3. **SCP Copy Failed**
   - Ensure the remote directory `/home/ubuntu/portfolio` exists
   - Check SSH key authentication if password authentication fails

### Debug Mode

To debug the script, you can run it with `bash -x deploy.sh` or add `set -x` to the script.

## Related Files

- `docker-compose.yml` - Docker Compose configuration
- `backend/` - Django backend application
- `frontend/` - Next.js frontend application

## License

This script is provided as-is. Use at your own risk.
