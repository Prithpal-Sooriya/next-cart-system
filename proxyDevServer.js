// Proxy Next Dev Server - map the styleguide docs route.
const express = require('express')
const path = require('path')
const next = require('next')
const { parse } = require('url')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const nextRouteHandler = (req, res) => {
  const { query } = parse(req.url, true)
  return query.page ? handle(req, res) : app.render(req, res, req.path, query)
}

const docsRouteHandler = (req, res) => {
  const file = path.join(__dirname, `/styleguide/build/${req.params.id}`)
  res.status(200).sendFile(file)
}

const run = async () => {
  await app.prepare()
  const server = express()

  server.get('/build/:id', docsRouteHandler)
  server.get('*', nextRouteHandler)

  await server.listen(3000)
  console.log('> Ready on http://localhost:3000')
}

run()
