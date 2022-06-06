import { connection } from './connection.js'
import mysql2 from 'mysql2'

export const adicionarPet = async pet => {
    const command = `
        INSERT INTO tb_pet (nm_pet)
            VALUES (?)
    `
    const [lines] = await connection.query(command, [pet.name])
    pet.id = lines.insertId
    return pet;
}

export const listarPets = async _ => {
    const command = `
        SELECT * 
          FROM tb_pet;
    `
    const [lines] = await connection.query(command);
    return lines
}

export const deletarPet = async pet => {
    const command = `
        DELETE FROM tb_pet
              WHERE id_pet = ?
    `
    const [lines] = await connection.query(command, [pet.id])
    return lines.affectedRows;
}

export const modificarPet = async pet => {
    const command = `
        UPDATE tb_pet 
           SET nm_pet      = ?
         WHERE id_pet      = ?;
    `
    const [lines] = await connection.query(command, [pet.name, pet.id])
    return lines.affectedRows
}