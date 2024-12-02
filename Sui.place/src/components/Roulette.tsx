import React,{useState} from "react";

const Roulette = () => {
  const [balance, setBalance] = useState(1.0); // Starting balance in Sui
  const [bets, setBets] = useState(Array(48).fill(0)); // Bets for numbers/sectors
  const [result, setResult] = useState(null); // Lucky number/result
  const [message, setMessage] = useState(""); // Result message
  const [hovering, setHovering] = useState(false);

  const CurrentTier = 0.01; // Bet multiplier

  const sectors = [
    "3rd column",
    "2nd column",
    "1st column",
    "1st 12",
    "2nd 12",
    "3rd 12",
    "1 to 18",
    "Even",
    "Red",
    "Black",
    "Odd",
    "19 to 36",
  ];

  const placeBet = (id:number, amount:number) => {
    const newBets = [...bets];
    newBets[id] += amount;

    if (newBets[id] < 0) newBets[id] = 0; // Prevent negative bets
    setBets(newBets);
    updateBalance();
  };

  const updateBalance = () => {
    const totalBets = bets.reduce((acc, bet) => acc + bet, 0);
    if (totalBets * CurrentTier > balance) {
      setMessage("Insufficient balance for your bets!");
      return;
    }
    setMessage(""); // Clear message if no issues
  };

  const calculateWin = (luckyNumber:number) => {
    let winAmount = 0;

    // Winning logic for numbers
    if (bets[luckyNumber] > 0) winAmount += bets[luckyNumber] * 36;

    // Add logic for sector-based bets if necessary
    // e.g., sectors[7] for "1 to 18"

    return winAmount * CurrentTier;
  };

  const spinRoulette = () => {
    const luckyNumber = Math.floor(Math.random() * 37); // Random number 0-36
    const winAmount = calculateWin(luckyNumber);

    const betAmount = bets.reduce((acc, bet) => acc + bet, 0) * CurrentTier;

    setResult(luckyNumber);
    if (winAmount >= betAmount) {
      setBalance(balance + winAmount - betAmount);
      setMessage(
        `Lucky number: ${luckyNumber}. You won ${winAmount.toFixed(2)} Sui!`
      );
    } else {
      setBalance(balance - betAmount);
      setMessage(
        `Lucky number: ${luckyNumber}. You lost ${betAmount.toFixed(2)} Sui.`
      );
    }
    setBets(Array(48).fill(0)); // Reset bets
  };

  return (
    <>
      <div className="p-10 w-full h-auto">
        <h1>Play Roullete as Royal</h1>
        <div className="roulette-table">
      <h2>Roulette Table</h2>
      <div className="balance">Balance: {balance.toFixed(2)} Sui</div>
      <div className="bets">
        <h4>Your Bets:</h4>
        {bets.map((bet, index) =>
          bet > 0 ? (
            <div key={index}>
              Bet on {index < 37 ? `Number ${index}` : sectors[index - 37]}: {bet * CurrentTier} Sui
            </div>
          ) : null
        )}
      </div>
      <div className="grid-cl">
        {Array.from({ length: 37 }, (_, i) => (
          <button
            key={i}
            className="bet-number"
            onClick={() => placeBet(i, 1)}
            onContextMenu={(e) => {
              e.preventDefault();
              placeBet(i, -1);
            }}
          >
            {i}
          </button>
        ))}
        {sectors.map((sector, i) => (
          <button
            key={`sector-${i}`}
            className="bet-sector"
            onClick={() => placeBet(37 + i, 1)}
            onContextMenu={(e) => {
              e.preventDefault();
              placeBet(37 + i, -1);
            }}
          >
            {sector}
          </button>
        ))}
      </div>
      <button onClick={spinRoulette}>Spin</button>
      <div className="result">
        <h4>{result !== null ? `Result: ${result}` : "Spin to see the result"}</h4>
        <p>{message}</p>
      </div>
    </div>
      </div>
    </>
  );
};

export default Roulette;
