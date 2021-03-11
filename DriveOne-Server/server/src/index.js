import restify from 'restify'
import router from './routes'

const server = restify.createServer()
router.applyRoutes(server)
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(restify.plugins.jsonp());

server.listen(8081, function () {
  console.log('servidor escuchando en http://127.0.0.1:8081')
})