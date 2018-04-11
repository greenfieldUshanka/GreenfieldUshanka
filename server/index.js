const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});