const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['../routes/restRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles);