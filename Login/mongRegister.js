const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/Register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: '❌ Please provide all fields' });

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(400).json({ message: '❌ User already exists' });

    await new User({ name, email, phone, password }).save();
    res.status(201).json({ message: '🎉 Registration successful!' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ message: '❌ Registration failed' });
  }
});


app.post('/login', async (req, res) => {
  console.log('📥 /login payload:', req.body);
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ message: '❌ Please provide email/phone and password' });

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    });

    if (!user)
      return res.status(401).json({ message: '❌ User not found' });

    if (user.password !== password)
      return res.status(401).json({ message: '❌ Incorrect password' });

    res.status(200).json({ message: `✅ Welcome ${user.name}!` });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: '❌ Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
