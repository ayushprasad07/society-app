const cors = require('cors');
const express = require('express')
const connectToMongo = require('./db')

connectToMongo();
const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin',require('./routes/admin'));
app.use('/api/v1/user',require('./routes/user'));
app.use('/api/v1/society',require('./routes/society'));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})