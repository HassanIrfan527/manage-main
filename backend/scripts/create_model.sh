#!/bin/bash

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."
cd "$ROOT_DIR"

NAME=$1
if [ -z "$NAME" ]; then
    echo "❌ Error: Provide a name (e.g., make create Product)"
    exit 1
fi

LOW_NAME=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
shift # Remove the name, leaving only the flags/words

echo "🚀 Generating files for $NAME..."

for arg in "$@"; do
    case $arg in
        # Now accepts 'repo', '--repo', 'repository', or '--repository'
        repo|repository|--repo|--repository)
            FOLDER="repositories"; FILE_SUFFIX="_repository" ;;
        schema|--schema)
            FOLDER="schemas"; FILE_SUFFIX="" ;;
        router|--router)
            FOLDER="routers"; FILE_SUFFIX="" ;;
        service|--service)
            FOLDER="services"; FILE_SUFFIX="_service" ;;
        *)
            echo "❓ Unknown: $arg (Skipping)"
            continue ;;
    esac

    mkdir -p "app/$FOLDER"
    TARGET_FILE="app/$FOLDER/${LOW_NAME}${FILE_SUFFIX}.py"
    
    # Create the file
    echo "class ${NAME}${FOLDER%s}:" > "$TARGET_FILE"
    echo "    pass" >> "$TARGET_FILE"
    
    
    echo "  ✅ Created $TARGET_FILE"
done