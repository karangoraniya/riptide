# 📜 Riptide Smart Contracts

This directory contains the smart contracts for the Riptide platform, implementing the community playground functionalities.

## 🚀 Quick Start

```bash
# Navigate to contract directory
cd contract

# Build and deploy
./deploy.sh all
```

## 📋 Available Commands

The `deploy.sh` script provides several commands:

```bash
./deploy.sh all       # Run everything (build, publish, start frontend)
./deploy.sh balance   # Check wallet balance
./deploy.sh build     # Build the contract
./deploy.sh publish   # Publish the contract
./deploy.sh deploy    # Build and publish the contract
./deploy.sh frontend  # Start frontend only
./deploy.sh help      # Show help message
```

Or use Make commands from the root directory:

```bash
make           # Deploy everything
make deploy    # Same as above
make build     # Only build contract
make publish   # Only publish contract
make balance   # Check wallet balance
```

## 🏗️ Contract Structure

```
treasuryfun/
├── sources/          # Contract source files
├── build/           # Compiled contracts
├── Move.toml        # Package manifest
└── deploy.sh        # Deployment script
```

## 💡 Contract Details

## 🔧 Development

1. Check your balance before deployment:

```bash
make balance
```

2. Build the contract:

```bash
make build
```

3. Publish the contract:

```bash
make publish
```

4. Or do everything at once:

```bash
make all
```

## ⚠️ Prerequisites

- Sui CLI installed
- Sufficient SUI balance for deployment (0.1 SUI minimum)
- [Add other prerequisites]

## 🧪 Testing

```bash
sui move test
```

## 📝 Contract Addresses

- Testnet: [https://testnet.suivision.xyz/package/0xf056c2631c508f5a6cf47c9da889da1c5ab7f9978da5fbe6078cfaf64caa3dbc]

## 📚 Additional Resources

- [Sui Documentation](https://docs.sui.io/)
- [Move Language Documentation](https://move-language.github.io/move/)
