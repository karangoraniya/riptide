const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
router.post("/register", async (req, res) => {
  try {
    const { wallet, username } = req.body;
    console.log("Registering user:", username);
    if (!wallet || !username) {
      return res.status(400).json({ message: "Please enter all fields" });
    }



    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const newUser = new User({ wallet, username });
    await newUser.save();

    // Respond with success
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/create-room", async (req, res) => {
  const {
    userId,
    nftName,
    nftDescription,
    poolAmount,
    selectedGame,
    selectedCommunity,
    winnerSelection,
  } = req.body;

  // Validate required fields
  if (
    !userId ||
    !nftName ||
    !poolAmount ||
    !selectedGame ||
    !selectedCommunity ||
    !winnerSelection
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create the new room
    const newRoom = {
      roomId: uuidv4(), // Generate a unique ID for the room
      nftName,
      nftDescription: nftDescription || "", // Optional description
      poolAmount,
      selectedGame,
      selectedCommunity,
      winnerSelection,
      createdAt: new Date(),
    };

    // Add the room to the user's rooms array
    user.rooms.push(newRoom);
    await user.save();

    return res.status(201).json({
      message: "Room created successfully.",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
router.get("/get-rooms", async (req, res) => {
  const rooms = await User.find({}, "rooms");
  res.status(200).json(rooms);
});
router.post("/update-amount", async (req, res) => {
  const { userId, amount, type } = req.body;
  console.log("Updating amount:", userId, amount, type);
  if (!userId || !amount) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (type === "withdraw") {
      if (user.amount < amount) {
        return res.status(400).json({ error: "Insufficient balance." });
      }
      user.amount -= amount;
    } else {
      user.amount += amount;
    }
    await user.save();
    return res.status(200).json({
      message: "Amount added successfully.",
      user: user,
    });
  } catch (error) {
    console.error("Error adding amount:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post('/add-transaction', async (req, res) => {
    const { username,wallet, type, amount, game, community } = req.body;
  
    if (!wallet || !type || !amount) {
      return res.status(400).json({ message: "Wallet, type, and amount are required" });
    }
  
    try {
      // Find the user by wallet
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create a new transaction object
      const newTransaction = {
        transactionId: uuidv4(), // Generate a unique ID
        type,
        amount,
        game: game || null,
        community: community || null,
        createdAt: Date.now(),
      };
  
      // Push the transaction to the user's transactions array
      user.transactions.push(newTransaction);
  
      // Save the updated user document
      await user.save();
  
      return res.status(200).json({
        message: "Transaction added successfully",
        transaction: newTransaction,
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
