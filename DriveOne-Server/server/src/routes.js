import { Router } from 'restify-router'

const clientes = {
  1: { name: 'Carlos', age: 23 },
  2: { name: 'Freddy', age: 18 },
  3: { name: 'Diego', age: 26 },
  4: { name: 'Pedro', age: 38 },
  5: { name: 'Ricardo', age: 13 },
}

const router = new Router()

/**
 * Obtiene todos los clientes
 */
router.get('/clientes', (req, res, next) => {
  res.json(clientes)
  next()
})

/**
 * Obtiene un cliente especificado en la posición req.query.index
 */
router.get('/clientes/:index', (req, res, next) => {
  const cliente = clientes[req.params.index]
  res.json(cliente)
  next()
})

/**
 * Crea un nuevo cliente
 */
router.post('/clientes', (req, res, next) => {
  console.log(req.body)
  let cliente = req.body;
  let index = 5;
  clientes[cliente.index += 1] = cliente
  res.setHeader('Content-type', 'application/json')
  res.writeHead(200)
  res.json(clientes)
  next()
})

/**
 * UPDATE
 */

router.put('/clientes/:index', (req, res, next) => {
  const client = clientes[parseInt(req.params.index)]
  const data = req.body
  for (let field in data) {
    client[field] = data[field]
  }
  res.writeHead(200)
  res.end(JSON.stringify(clientes))
});

/**
 * DELETE
 */

router.del('/clientes/:index', (req, res, next) => {
  delete clientes[parseInt(req.params.index)];
  res.end(JSON.stringify(clientes));
});


/**
 * Saluda y dí tu nombre
 */
router.get('/clientes/:index/saludar', (req, res, next) => {
  saludar(req.params.index, (mensaje) => {
    res.send(mensaje)
    next()
  })
})

function saludar(index, callback) {
  setTimeout(() => {
    const client = clientes[index]
    const saludo = 'Hola! soy ' + client.name
    callback(saludo)
  }, 1000)
}

//Saludo con Promesa
const saludarPromise = (name) => new Promise(resolve => {
  resolve(`Hola, yo soy ${name}`)
})

/**
 * Saluda y dí tu nombre utilizando async/await
 */
router.get('/clientes/:index/saludar-async-await', async (req, res, next) => {
  const hiCliente = clientes[req.params.index]
  res.send(await saludarPromise(hiCliente.name))
  next()
})

/**
 * Saluda y dí tu nombre utilizando then
 */
router.get('/clientes/:index/saludar-then', async (req, res, next) => {
  const hiCliente = clientes[req.params.index]
  await saludarPromise(hiCliente.name)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  // resolver `saludarPromise` con then
})

/*
  *SUMAR EDADES 
*/

router.get('/clientes/sumar-edades/:metodo', async (req, res, next) => {
  const metodo = req.params.metodo;
  await calculationAge(metodo)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.send({
        msg: 'El metodo es un string'
      })
    })
  next()
})

const calculationAge = (metodo) => new Promise(resolve => {
  const allAges = [];
  if (metodo == 'forin') {
    for (let cli in clientes) {
      allAges.push(cli.age)
    }
  }
  let num = allAges.reduce((n1, n2) => n1 + n2, 0)
  resolve({
    suma: num
  })
})


export default router;
