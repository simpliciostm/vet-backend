import server from "./server"

server.listen(process.env.PORT, () => {
  console.log(`Starting server`)
  console.log(`http://localhost:${process.env.PORT}`)
})
