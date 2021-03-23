const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}));
// application/jason 을 분석해서 가져올 수 있게함
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/compiler', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})