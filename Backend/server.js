const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const jobRoutes = require('./src/job/routes');
const employerRoutes = require('./src/employer/routes');
const authRoutes = require('./src/auth/routes');

const app = express();
const port = 4500;

app.use(cookieParser());
// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World!");
});

app.use('/api/v1/admin/', jobRoutes);
app.use('/api/v1/emp/', employerRoutes);
app.use('/api/v1/auth/', authRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));