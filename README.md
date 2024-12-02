# 🎮 Riptide - NFT Community Playground

Riptide is an interactive playground where communities can come together to play, interact, and engage with other community members. It's a space where different communities can engage in various activities together.

## 🚀 Quick Start

```bash
# Clone the repository
git clone git@github.com:karangoraniya/riptide.git
cd riptide

# Install dependencies and start the project
make all # Deploy everything (build, publish)
```

## 📋 Available Commands

```bash
make all          # Deploy everything (build, publish)
make deploy    # Same as above
make build     # Only build the contract
make publish   # Only publish the contract
make balance   # Check wallet balance
```

## 🏗️ Project Structure

```
riptide/
├── frontend/         # Frontend application
│   └── Sui.place/   # Frontend React application
├── contracts/       # Smart contracts
│   └── sources/ # Main contract directory
└── README.md        # This file
```

## 👥 Team

- Karan Goraniya
  - GitHub: [@karangoraniya](https://github.com/karangoraniya)
- Niraj Choubisa
  - GitHub: [@Kali-Decoder](https://github.com/Kali-Decoder)
- Soham Shah
  - GitHub: [@TheDARKFURY](https://github.com/TheDARKFURY)

## 🔧 Technical Details

- Frontend: Next.js
- Smart Contracts: Sui Move
- Deployment: Sui Network

## 📜 Smart Contract Details

For detailed information about the smart contracts, please see the [Contract README](./contracts/treasuryfun/README.md).

## 🎮 Features

- NFT Community Integration
- Interactive Playground
- Cross-Community Engagement

## 🛠️ Development

1. Check your wallet balance:

```bash
make balance
```

2. Build and deploy:

```bash
make deploy
```

3. For individual operations:

```bash
make build     # Build contracts only
make publish   # Publish contracts only
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
