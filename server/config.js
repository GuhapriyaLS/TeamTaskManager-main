module.exports = {
  db: {
    user: 'sa',
    password: 'Enter@321',
    database: 'TaskManager',
    server: 'GUHAS-INSPIRON',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true,
      trustedConnection: false,
      enableArithAbort: true
    },
    port: 1433
  },
  auth: {
    jwtSecret: 'secret'
  }
}
