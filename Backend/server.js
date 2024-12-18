const http = require('http');
const app = require('./app');

const dbConnect = require('./config/dbConnect');
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

dbConnect().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is Running at ${PORT}`);
        console.log(`Database is Successfully Connected!`);
    });
}).catch((e) => {
    console.log(e);
})


