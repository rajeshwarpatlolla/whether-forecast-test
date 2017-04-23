const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist')); // eselint-disable-line

app.all('/*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server started at port: ' + port);  // eselint-disable-line
});
