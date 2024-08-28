#!/bin/bash

# Function to build and run the Docker container
build_and_run() {
    echo "Building the Docker image..."
    docker build -t my-redis .
    echo "Running the Docker container..."
    docker run -d -p 6379:6379 --name redis-container my-redis
}

# Function to start the Docker container
start_container() {
    if [ "$(docker ps -q -f name=redis-container)" ]; then
        echo "Container is already running. Restarting..."
        docker restart redis-container
    elif [ "$(docker ps -aq -f status=exited -f name=redis-container)" ]; then
        echo "Container is stopped. Starting..."
        docker start redis-container
    fi
}

# Check the argument
case "$1" in
    build)
        build_and_run
        ;;
    start|restart)
        start_container
        ;;
    *)
        echo "Usage: $0 {build|start|restart|run}"
        exit 1
        ;;
esac
