let express = require('express'),
    cors = require('cors'),
    app = express(),
    config = require('./lib/config'),
    bodyParser = require('body-parser'),
    userCrud = require('./user/crud');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors({origin: config.get('origin')}));

app.get('/api/users', userCrud.get);
app.get('/api/users/:id', userCrud.getById);

app.post('/api/authenticate', userCrud.authenticate);

app.post('/api/save', userCrud.save);

app.put('/api/change-password/:id', userCrud.updateUser);

app.put('/api/become-admin/:id', userCrud.updateUser);

app.put('/api/block-user/:id', userCrud.updateUser);

app.put('/api/unblock-user/:id', userCrud.updateUser);

app.put('/api/update-user/:id', userCrud.updateUser);

app.delete('/api/users/:id', userCrud.deleteUser);


app.listen(config.get('port'), function () {
    console.log('Express server listening on port ' + config.get('port'));
});