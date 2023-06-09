const http = require('http');
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./swagger/swagger_output.json');
const mongo = require('./mongo');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/bootstrap-css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap-js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/resources', express.static(__dirname + '/public/resources'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongo.dbOn();
require('./routes/authorRoutes')(app);
require('./routes/bookRoutes')(app);
require('./routes/restRoutes')(app);
require('./routes/graphqlRoutes')(app);

app.get('/', async function(req, res) {
    const statusCode = req.query.statusCode;
    return res.render('index', { 
        statusCode: statusCode,
        operationType: req.query.operationType 
    });
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);