require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

app = express();

app.use(express.json());
app.use('/book', bookRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});