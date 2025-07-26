#!/bin/bash

# GitLab MR Copy Extension Build Script
# Builds extension for both Chrome and Firefox platforms

set -e

echo "🔨 Building GitLab MR Copy Extension..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to build for a specific platform
build_platform() {
    local platform=$1
    local manifest_file=$2
    local build_dir="build/$platform"

    echo -e "${BLUE}📦 Building for $platform...${NC}"

    # Clean build directory
    rm -rf "$build_dir"
    mkdir -p "$build_dir"

    # Copy all source files except manifest files
    cp src/*.js src/*.html src/*.png "$build_dir/"

    # Copy platform-specific manifest as manifest.json
    cp "src/$manifest_file" "$build_dir/manifest.json"

    # Create distributable ZIP
    cd "$build_dir"
    zip -r "../gitlab-mr-copy-${platform}.zip" .
    cd - > /dev/null

    echo -e "${GREEN}✅ $platform build complete: build/gitlab-mr-copy-${platform}.zip${NC}"
}

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build/chrome build/firefox
rm -f build/*.zip

# Build for Chrome (Manifest V3)
build_platform "chrome" "manifest-chrome.json"

# Build for Firefox (Manifest V2)
build_platform "firefox" "manifest-firefox.json"

echo -e "${GREEN}🎉 Build complete!${NC}"
echo "📁 Chrome build: build/chrome/"
echo "📁 Firefox build: build/firefox/"
echo "📦 Chrome ZIP: build/gitlab-mr-copy-chrome.zip"
echo "📦 Firefox ZIP: build/gitlab-mr-copy-firefox.zip"
