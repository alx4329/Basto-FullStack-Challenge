const server = require('./src/app.js')
const connectDB = require('./src/config/db.js')

server.listen(3001, () => {
    console.log('Server listening on port 3001')
    connectDB()
})