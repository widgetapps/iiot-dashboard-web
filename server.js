let express = require('express');
let app = express();
app.use(express.static('dist/iiot-platform-web'));
app.get('*', function (req, res, next) {
  res.redirect('/');
});
app.listen(8080);
