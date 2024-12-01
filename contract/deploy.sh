#!/bin/bash

# Configuration
REQUIRED_GAS=100000000 # 0.1 SUI
FRONTEND_DIR="./Sui.place"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if sui is installed
check_sui_installation() {
    if ! command -v sui &> /dev/null; then
        echo -e "${RED}❌ Error: sui is not installed${NC}"
        echo "Please install sui first: https://docs.sui.io/guides/developer/getting-started/sui-install"
        exit 1
    fi
}

# Function to check balance
check_balance() {
    echo -e "${YELLOW}💰 Checking balance...${NC}"
    BALANCE_OUTPUT=$(sui client balance)
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to check balance${NC}"
        exit 1
    fi
    echo "$BALANCE_OUTPUT"

    # Extract SUI balance
    SUI_BALANCE=$(echo "$BALANCE_OUTPUT" | grep "Sui" | awk '{print $3}')
    if [ -z "$SUI_BALANCE" ]; then
        echo -e "${RED}❌ Could not determine SUI balance${NC}"
        exit 1
    fi

    # Convert to integer (remove decimal points)
    BALANCE_INT=${SUI_BALANCE%.*}
    if [ "$BALANCE_INT" -lt "$REQUIRED_GAS" ]; then
        echo -e "${RED}❌ Insufficient balance for gas${NC}"
        echo "Required: $REQUIRED_GAS"
        echo "Current balance: $BALANCE_INT"
        exit 1
    fi
    echo -e "${GREEN}✅ Sufficient balance found: $SUI_BALANCE SUI${NC}"
}

# Function to build contract
build() {
    echo -e "${YELLOW}🔨 Building contract...${NC}"
    if sui move build; then
        echo -e "${GREEN}✅ Build successful!${NC}"
        return 0
    else
        echo -e "${RED}❌ Build failed!${NC}"
        return 1
    fi
}

# Function to publish contract
publish() {
    echo -e "${YELLOW}📦 Publishing contract...${NC}"
    if sui client publish --gas-budget $REQUIRED_GAS; then
        echo -e "${GREEN}✅ Publication successful!${NC}"
        return 0
    else
        echo -e "${RED}❌ Publication failed!${NC}"
        return 1
    fi
}

# Function to start frontend
start_frontend() {
    echo -e "${YELLOW}🌐 Starting frontend...${NC}"
    if [ -d "$FRONTEND_DIR" ]; then
        cd "$FRONTEND_DIR"
        if [ -f "package.json" ]; then
            echo -e "${BLUE}Installing frontend dependencies...${NC}"
            npm install
            echo -e "${BLUE}Starting frontend server...${NC}"
            npm run dev &
            echo -e "${GREEN}✅ Frontend started!${NC}"
            cd - > /dev/null
        else
            echo -e "${RED}❌ No package.json found in frontend directory${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Frontend directory not found${NC}"
        return 1
    fi
}

# Function to run everything
run_all() {
    echo -e "${YELLOW}🚀 Starting complete deployment...${NC}"
    
    # Check balance
    check_balance
    
    # Build and publish contract
    if build; then
        if publish; then
            # Start frontend
            if start_frontend; then
                echo -e "${GREEN}✅ All systems started successfully!${NC}"
                echo -e "${BLUE}Frontend should be available at http://localhost:3000${NC}"
                echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
                
                # Keep script running
                wait
            else
                echo -e "${RED}❌ Frontend startup failed${NC}"
                return 1
            fi
        else
            echo -e "${RED}❌ Contract publication failed${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Contract build failed${NC}"
        return 1
    fi
}

# Function to show help
show_help() {
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  all       Run everything (build, publish, start frontend)"
    echo "  balance   Check wallet balance"
    echo "  build     Build the Sui Move contract"
    echo "  publish   Publish the contract (includes balance check)"
    echo "  deploy    Build and publish the contract"
    echo "  frontend  Start the frontend only"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh all       # Run everything"
    echo "  ./deploy.sh balance   # Check your wallet balance"
    echo "  ./deploy.sh deploy    # Build and publish contract"
}

# Main script logic
check_sui_installation

case "$1" in
    "all")
        run_all
        ;;
    "balance")
        check_balance
        ;;
    "build")
        build
        ;;
    "publish")
        check_balance
        publish
        check_balance
        ;;
    "deploy")
        check_balance
        build && publish
        check_balance
        ;;
    "frontend")
        start_frontend
        wait
        ;;
    "help" | "--help" | "-h" | "")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo "Run './sui.sh help' for usage information"
        exit 1
        ;;
esac

# #!/bin/bash

# # Configuration
# REQUIRED_GAS=100000000 # 0.1 SUI

# # Colors for output
# RED='\033[0;31m'
# GREEN='\033[0;32m'
# YELLOW='\033[1;33m'
# NC='\033[0m' # No Color

# # Function to check if sui is installed
# check_sui_installation() {
#     if ! command -v sui &> /dev/null; then
#         echo -e "${RED}❌ Error: sui is not installed${NC}"
#         echo "Please install sui first: https://docs.sui.io/guides/developer/getting-started/sui-install"
#         exit 1
#     fi
# }

# # Function to check balance
# check_balance() {
#     echo -e "${YELLOW}💰 Checking balance...${NC}"
#     BALANCE_OUTPUT=$(sui client balance)
#     if [ $? -ne 0 ]; then
#         echo -e "${RED}❌ Failed to check balance${NC}"
#         exit 1
#     fi
#     echo "$BALANCE_OUTPUT"

#     # Extract SUI balance
#     SUI_BALANCE=$(echo "$BALANCE_OUTPUT" | grep "Sui" | awk '{print $3}')
#     if [ -z "$SUI_BALANCE" ]; then
#         echo -e "${RED}❌ Could not determine SUI balance${NC}"
#         exit 1
#     fi

#     # Convert to integer (remove decimal points)
#     BALANCE_INT=${SUI_BALANCE%.*}
#     if [ "$BALANCE_INT" -lt "$REQUIRED_GAS" ]; then
#         echo -e "${RED}❌ Insufficient balance for gas${NC}"
#         echo "Required: $REQUIRED_GAS"
#         echo "Current balance: $BALANCE_INT"
#         exit 1
#     fi
#     echo -e "${GREEN}✅ Sufficient balance found: $SUI_BALANCE SUI${NC}"
# }

# # Function to build contract
# build() {
#     echo -e "${YELLOW}🔨 Building contract...${NC}"
#     if sui move build; then
#         echo -e "${GREEN}✅ Build successful!${NC}"
#         return 0
#     else
#         echo -e "${RED}❌ Build failed!${NC}"
#         return 1
#     fi
# }

# # Function to publish contract
# publish() {
#     echo -e "${YELLOW}📦 Publishing contract...${NC}"
#     if sui client publish --gas-budget $REQUIRED_GAS; then
#         echo -e "${GREEN}✅ Publication successful!${NC}"
#         return 0
#     else
#         echo -e "${RED}❌ Publication failed!${NC}"
#         return 1
#     fi
# }

# # Function to show help
# show_help() {
#     echo "Usage: ./sui.sh [command]"
#     echo ""
#     echo "Commands:"
#     echo "  balance    Check wallet balance"
#     echo "  build      Build the Sui Move contract"
#     echo "  publish    Publish the contract (includes balance check)"
#     echo "  deploy     Build and publish the contract"
#     echo "  help       Show this help message"
#     echo ""
#     echo "Examples:"
#     echo "  ./sui.sh balance    # Check your wallet balance"
#     echo "  ./sui.sh deploy     # Build and publish contract"
# }

# # Main script logic
# check_sui_installation

# case "$1" in
#     "all")
#         run_all
#         ;;
#     "balance")
#         check_balance
#         ;;
#     "build")
#         build
#         ;;
#     "publish")
#         check_balance
#         publish
#         check_balance
#         ;;
#     "deploy")
#         check_balance
#         build && publish
#         check_balance
#         ;;
#     "help" | "--help" | "-h" | "")
#         show_help
#         ;;
#     *)
#         echo -e "${RED}❌ Unknown command: $1${NC}"
#         echo "Run './sui.sh help' for usage information"
#         exit 1
#         ;;
# esac