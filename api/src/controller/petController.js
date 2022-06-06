import { Router } from 'express'
import { adicionarPet, listarPets, deletarPet, modificarPet } from '../repository/petRepository.js'

const server = Router()

server.get('/pet', async (req, resp) => {
    try{
        const response = await listarPets();
        resp.send(response);
    } catch(err){
        console.log(err);
        resp.status(404).send({error:err})
    }
})

server.post('/pet', async (req, resp) => {
    try{
        const pet = req.body
        if(!pet.name)
            throw new Error("Informe um nome para o PET")
        const response = await adicionarPet(pet)
        resp.send(response)
    } catch(err){
        console.log(err);
        resp.status(404).send({error:err})
    }
})

server.delete('/pet', async (req, resp) => {
    try{
        const pet = req.body
        if(!pet.id)
            throw new Error("Informe o id do pet que deseja deletar")
        const response = deletarPet(pet)
        if(!response)
            throw new Error("Algo deu errado")
        else
            resp.status(204).send()
    } catch(err){
        console.log(err)
        resp.status(404).send({error: err})
    }
})

server.put('/pet', async (req, resp) => {
    try{
        const pet = req.body
        if(!pet.id)
            throw new Error("Informe o id do pet que deseja modificar")
        if(!pet.name)
            throw new Error("Informe um novo nome para o PET")
        const response = modificarPet(pet)
        if(!response)
            throw new Error("Algo deu errado")
        else
            resp.status(204).send()
    } catch(err){
        console.log(err)
        resp.status(404).send({error: err})
    }
})

export default server