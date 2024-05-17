import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//GET FUNCTION all data
export async function getAllData(){
    const [rows] = await pool.query("SELECT * FROM user_information")
    return rows
}
//GET FUNCTION single data row by id
export async function getSingleData(id){
    try {
        const [result] = await pool.query(`
            SELECT * 
            FROM user_information
            WHERE user_id = ?`, [id]
        )
        // if (result.affectedRows === 0) {
        //     throw new Error(`Client with ID ${id} not found`);
        // }
        return result
    } catch (error) {
        console.error('Error geting client:', error);
        throw error;
    }
}
//PUT FUNCTION add row of new client data  
export async function createData(user_name, user_email, user_password, user_phone){
    try {
        const [existingUser] = await pool.query(`
            SELECT user_email 
            FROM user_information 
            WHERE user_email = ?`, [user_email]
        );
        if (existingUser.length > 0) {
            // throw new Error('User with this email already exists.');
            const user_Exist = 'User with this email already exists.';
            return user_Exist
        }
        else{
            const [result] = await pool.query(`
                INSERT INTO user_information (user_name, user_email, user_password, user_phone)
                VALUES (?,?,?,?)`, [user_name, user_email, user_password, user_phone]
            )    
            const user_Exist = await getSingleData(result.insertId);
            return user_Exist[0]
        }
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}
//UPDATE FUNCTION change particualr value of existing client
export async function updateData(client_id, name, address, city, state, phone) {
    try {
        const result = await pool.query(`
            UPDATE clients
            SET name = ?, address = ?, city = ?, state = ?, phone = ?
            WHERE client_id = ?`, [name, address, city, state, phone, client_id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Client with ID ${client_id} not found.`);
        }
        return `Client with ID ${client_id} updated successfully`;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
}
//DELETE FUNCTION delete all data of existing client
export async function deleteData(id){
    try {
        const [result] = await pool.query(`
            DELETE FROM clients
            WHERE client_id = ?`, [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Client with ID ${id} not found`);
        }
        return `Client with ID ${id} deleted successfully`;
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
}


// const result = await createClient(6, 'Sunny', 'test', 'Karachi', 'va', '123')
// console.log(result)

// const result = await updateClient(6, 'hassan', 'test', 'Karachi', 'va', '123')
// console.log(result)

// const clients = await getSingleData(1);
// console.log('clients', clients)

// const clients = await getAllData();
// console.log('clients', clients)

// const clients = await deleteClient(6);
// console.log(clients)