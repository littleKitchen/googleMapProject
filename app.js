const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.listen(3000, function () {
    console.log(`web Serve runing at http://localhost:3000/`)
});
