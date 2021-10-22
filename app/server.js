const express = require('express')
const redis = require('redis') // https://github.com/redis/node-redis/tree/v3.0.2

const app = express();
const client = redis.createClient(process.env.REDIS_SERVER, 6379);

const port = process.env.SERVER_PORT
const address = process.env.BINDING_ADDRESS

//Set initial visits
client.set('visits', 0);

//defining the root endpoint
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits + 1)
        client.set('visits', parseInt(visits) + 1)
    })
})

//specifying the listening port
app.listen(port, address,()=>{
    console.log('Listening on port 8081')
})
