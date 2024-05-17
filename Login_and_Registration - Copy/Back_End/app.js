import express from 'express'

import { getSingleData, getAllData, createData, updateData, deleteData } from './database.js'


const app = express()

app.use(express.json())

app.get("/user_information", async (req, res)=>{
    const clients = await getAllData()
    res.send(clients)
})

app.get("/user_information/:user_id", async (req, res)=>{
    const id = req.params.user_id
    const client = await getSingleData(id)
    res.send(client)
})

app.post("/user_information", async(req, res)=>{
    const {user_name, user_email, user_password, user_phone} =req.body
    const client = await createData(user_name, user_email, user_password, user_phone)
    console.log('client', client)
    res.status(200).send(client)
    return client
})

app.put("/clients/:client_id", async(req, res)=>{
    const id = req.params.client_id
    const { name, address, city, state, phone} =req.body
    const client = await updateData( name, address, city, state, phone)
    res.status(200).send(client)
})

app.delete("/clients/:client_id", async (req, res)=>{
    const id = req.params.client_id
    const client = await deleteData(id)
    res.send(client)
})

app.use((err, req, res, next)=> {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})
