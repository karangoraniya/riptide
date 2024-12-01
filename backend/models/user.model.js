const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  wallet: { type: String, required: true },
  amount: { type: Number, default: 0 },
  rooms: [
    {
      roomId: { type: String }, // Reference to the room ID
      nftName: { type: String,  },
      nftDescription: { type: String },
      poolAmount: { type: Number, },
      selectedGame: { type: String },
      selectedCommunity: { type: String },
      winnerSelection: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  transactions: [
    {
      transactionId: { type: String }, 
      type: { type: String, enum: ['deposit', 'withdrawal'], required: true }, 
      amount: { type: Number, required: true }, // Amount of the transaction
      game: { type: String }, 
        community: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
