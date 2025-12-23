import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { generateReceiptPDF } from "../api/generateReceiptPDF";

export default function ReceiptPage() {
  const [receiptId, setReceiptId] = useState("");
  const { getReceiptById, receipt, receiptLoading, receiptError } = useAuth();

  const handleFetch = async () => {
    if (!receiptId) return;
    await getReceiptById(receiptId);
  };

  const handleDownload = () => {
    if (!receipt) return;
    generateReceiptPDF(receipt);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fetch Receipt</h2>

      <input
        type="text"
        placeholder="Enter Receipt ID"
        value={receiptId}
        onChange={(e) => setReceiptId(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <button onClick={handleFetch} style={{ marginLeft: "10px", padding: "10px" }}>
        Get Receipt
      </button>

      {receiptLoading && <p>Loading receipt...</p>}
      {receiptError && <p style={{ color: "red" }}>{receiptError}</p>}

      {receipt && (
        <div style={{ marginTop: "20px" }}>
          <h3>Receipt Details</h3>
          <pre>{JSON.stringify(receipt, null, 2)}</pre>

          <button
            onClick={handleDownload}
            style={{
              marginTop: "10px",
              background: "green",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px"
            }}
          >
            Download PDF Receipt
          </button>
        </div>
      )}
    </div>
  );
}
