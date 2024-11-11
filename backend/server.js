const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/save-segment", async (req, res) => {
  const data = req.body;

  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      "https://webhook.site/8be690de-4e65-4d8a-865d-3e5dff4c5766",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    const responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text(); // Fallback to text if not JSON

    res.json({ responseData });
  } catch (error) {
    console.error("Error saving segment:", error);
    res.status(500).json({ error: "Error saving segment" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
