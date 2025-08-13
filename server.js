import http from 'node:http'

// We need to specify the port
const PORT = 8000

const server = http.createServer((req, res) => {
  // Sends data over http and ends the response
  res.end('Hello from the server')
})

// We need to listen on that port, we need to also pass a callback to execute when the server connects
server.listen(PORT, () => console.log(`server running on port: ${PORT}`))