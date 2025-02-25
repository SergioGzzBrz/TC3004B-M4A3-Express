import sql from 'mssql'

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
    trustServerCertificate: true
  }
}


const sqlConnect = async () => {
    try {
        return await sql.connect(sqlConfig)
    } catch (err) {
        console.error("well that's sad")
        console.error(err)
        console.error("----")
    }
}

export { sqlConnect, sql }