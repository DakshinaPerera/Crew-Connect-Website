const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./src/admin/routes');
const employerRoutes = require('./src/employer/routes');
const authRoutes = require('./src/auth/routes');
const employeeRoutes = require('./src/employee/routes');
const contactRoutes = require('./src/contact/routes');

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

app.use('/api/v1/admin/', adminRoutes);
app.use('/api/v1/emp/', employerRoutes);
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/empe/', employeeRoutes);
app.use('/api/v1/c/', contactRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));