import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import Router from './routes/index'

dotenv.config()

const server = express()

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true}))
server.use(cors())

server.use(Router)


server.listen(process.env.PORT)