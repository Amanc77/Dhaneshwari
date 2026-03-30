const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Passport must be initialized before routes
app.use(passport.initialize());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/slider', require('./routes/slider'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/amenities', require('./routes/amenities'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/uploads', express.static('uploads'));
app.use('/sitemap.xml', require('./routes/sitemap'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));