const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['../restRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles);