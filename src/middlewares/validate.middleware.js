import { dbmaster } from '../database/db.connection.js';

export function validateBody(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {abortEarly:false})
    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }
    next()
}
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.query, {abortEarly:false})
    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }
    next()
  }
}

export async function validateToken(req, res, next) {
  const headers = req.headers
  const authorization = headers.authorization || headers.Authorization
  const token = authorization?.replace('Bearer ', '')
  if(!token) return res.status(401).send('Missing Token')
  console.log(req.headers)
  try {
    const { rows: sessions } = await dbmaster.query(`
    SELECT * FROM session WHERE token = $1
      `, [token])
    if(!sessions.length) return res.status(401).send('Session does not exist')
    const user_id = sessions[0].user_id;
    const { rows: userResponse } = await dbmaster.query(`
      SELECT * FROM users WHERE id = $1
      `, [user_id])
    if(!userResponse.length) return res.status(404).send('User does not exist')
    res.locals.session = sessions[0]
    res.locals.user = userResponse[0]
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}