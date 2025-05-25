const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Serve static files from public folder (for the front-end)
app.use(express.static('public'));

app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  // If no date parameter, use current date
  if (!dateString) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // If date string is a number (timestamp), parse it to int
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Timestamp Microservice listening on port ${port}`);
});
