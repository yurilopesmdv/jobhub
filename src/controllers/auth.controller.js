import bcrypt from 'bcrypt';
import { dbmaster } from '../database/db.connection.js';
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
  const { name, email, password, birth_date, type } = req.body;
  const userExists = await dbmaster.query(`
    SELECT * FROM users WHERE email = $1
  `, [email]);
  if (userExists.rows.length) return res.status(409).send('User already exists');

  const hash = bcrypt.hashSync(password, 10);
  try {
    await dbmaster.query(`
      INSERT INTO users (name, email, password, birth_date, type)
      VALUES ($1, $2, $3, $4, $5)
    `, [name, email, hash, birth_date, type]);
    res.status(201).send('User created');
  } catch(err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const { rows: users } = await dbmaster.query(`
      SELECT * FROM users WHERE email = $1
      `, [email]);
    if (!users.length) return res.status(404).send('User not found');
    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).send('Invalid credentials');
    const token = uuid();
    await dbmaster.query(`
      INSERT INTO session (token, user_id)
      VALUES ($1, $2)
      `, [token, user.id]);
    res.send(token);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function logout(req, res) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    await dbmaster.query(`
      DELETE FROM session WHERE token = $1
    `, [token]);
    res.send('Logged out');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}