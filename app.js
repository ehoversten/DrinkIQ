// Load Express 
const express = require('express');





// Instaniate App Instance
const app = express();

// Routes
app.get('/', (req, res) => {
    res.send('Bingo Test');
})

// Declare PORT
const PORT = 5000;


// Run Server
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});