const cors = require('cors');
const express = require('express')
const connectToMongo = require('./db')

connectToMongo();
const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin',require('./routes/admin'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})