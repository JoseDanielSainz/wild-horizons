import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'

// We need to specify the port
const PORT = 8000


const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    sendJSONResponse(res, 200, destinations)
  } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {

    const continent = req.url.split('/').pop()
    const filteredData = getDataByPathParams(destinations, 'continent', continent)

    sendJSONResponse(res, 200, filteredData)

  } else if (req.url.startsWith('/api/country') && req.method === 'GET') {

    const country = req.url.split('/').pop()
    const filteredData = getDataByPathParams(destinations, 'country', country)

    sendJSONResponse(res, 200, filteredData)


  } else {

    res.setHeader('Content-Type', 'application/json')
    sendJSONResponse(res, 404, ({
      error: 'not found',
      message: 'The request route does not exist'
    }))
  }


})

// We need to listen on that port, we need to also pass a callback to execute when the server connects
server.listen(PORT, () => console.log(`server running on port: ${PORT}`))