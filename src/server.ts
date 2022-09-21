import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/users';

// Chamando Router do Express
const router: Express = express()

// Criando log de trasações da API
router.use(morgan('dev'))
// Fazendo com que a body receba requições POST
router.use(express.urlencoded({ extended: false }))
// Fazendo que as respostas da API sejam em Json
router.use(express.json())
// Fazendo com que o Router apos a "/", utilize as Routes
router.use('/', routes)

const server = http.createServer(router)
server.listen('3333', () => console.log("Deu bão!"))