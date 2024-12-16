const express = require('express');

const jobRoutes = require('./src/job/routes');
const employerRoutes = require('./src/employer/routes');
const authRoutes = require('./src/auth/routes');
const app = express();
const port = 4500;

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World!");
})


app.use('/api/v1/admin/', jobRoutes);
app.use('/api/v1/emp/', employerRoutes);
app.use('/api/v1/auth/', authRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));

