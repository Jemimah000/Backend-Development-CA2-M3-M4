const express = require("express");
const app = express();
app.use(express.json());
let users = []; 
let id = 1; 
app.post("/", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = { id: id++, name, email, age };
  users.push(user);
  res.status(201).json(user);
  });
  app.put("/", (req, res) => {
  const user = users.find((u) => u.id == parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  const { name, email, age } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (age) user.age = age;

  res.json(user);
  });
  app.delete("/", (req, res) => {
  users = users.filter((u) => u.id != parseInt(req.params.id));
  res.json({ message: "User deleted" });  
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
