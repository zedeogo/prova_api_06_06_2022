import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connection } from './repository/connection.js'
import petController from './controller/petController.js'

const server = express()
server.use(cors())
server.use(express.json())

// conexões com endpoints
server.use(petController)

server.get('/ping', (req, resp) => resp.send('Pong!'))

server.listen(process.env.PORT, _ => console.log(`API Online na porta ${process.env.PORT}`))