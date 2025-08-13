import http from 'node:http'
import { getDataFromDB } from './database/db.js'

// We need to specify the port
const PORT = 8000


const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(destinations))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 404
    res.end(JSON.stringify({ error: "not found", message: "The request route does not exist" }))
  }


})

// We need to listen on that port, we need to also pass a callback to execute when the server connects
server.listen(PORT, () => console.log(`server running on port: ${PORT}`))