
//  we will define some server-side configuration-related
// variables that will be used in the code but should not be hardcoded as a best practice,
// as well as for security purposes
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'Your_secret_key',
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGO_PORT || 27017}/mernProject`


}

export default config;