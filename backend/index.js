// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI, { UseNewUrlParser: true, UseUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use('/api/auth', require('./routes/auth'));
// app.use('api/tasks', require('./routes/tasks')); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskExpiryJob = require('./Cron/taskExpiry');
const dashboardRoutes = require('./routes/dashboard');


require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/dashboard', dashboardRoutes);

taskExpiryJob();

app.listen(5000, () => console.log('Server running on port 5000'));
