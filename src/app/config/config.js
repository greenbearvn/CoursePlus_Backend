const config = {
    port: process.env.PORT || 3000,
    db: {
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'hungdx',
      password: process.env.DB_PASSWORD || '2352002',
      database: process.env.DB_NAME || 'doan4',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'heu bam lan anh',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    }
  };
  
  module.exports = config;