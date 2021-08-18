const mongoose = require('mongoose');

const app = require('./app');
const PORT = process.env.PORT || 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/notes_network')
.then(()=>{
    console.log('Database ready!');
    //server
    app.listen(PORT, () => {
        console.log('Server ready, port:', PORT);
    });
})
.catch(err => {
    console.log('Failed to connect to database:', err);
});