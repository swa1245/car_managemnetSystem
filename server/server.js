const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger');
const connectDB = require('./config');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
