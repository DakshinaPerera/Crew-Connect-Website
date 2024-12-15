const express = require('express');

const jobRoutes = require('./src/job/routes');
const employerRoutes = require('./src/employer/routes');

const app = express();
const port = 4500;

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World!");
})


app.use('/api/v1/admin/', jobRoutes);
app.use('/api/v1/emp/', employerRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

