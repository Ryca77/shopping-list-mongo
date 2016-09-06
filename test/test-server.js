global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    
        after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                /*storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');*/
                done();
            });
    });
    
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
    
describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
            chai.request(app)
                .put('/items/' + res.body[0]._id)
                .send({name: 'Apples'})
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');
                    /*res.body.should.have.a.property('name');
                    res.body.should.have.a.property('id');
                    res.body.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Apples');
                    res.body.id.should.equal(0);*/
                    /*storage.items[0].should.be.a('object');
                    storage.items[0].should.have.a.property('name');
                    storage.items[0].should.have.a.property('id');
                    storage.items[0].name.should.be.a('string');
                    storage.items[0].id.should.be.a('number');
                    storage.items[0].name.should.equal('Apples');
                    storage.items[0].id.should.equal(0)*/
                    done();
                });
            });
    });
    
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    it('should delete an item on delete', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
            chai.request(app)
                .delete('/items/' + res.body[0]._id)
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    /*storage.items.should.have.length(3);
                    storage.items[0].should.be.a('object');
                    storage.items[0].should.have.a.property('name');
                    storage.items[0].should.have.a.property('id');
                    storage.items[0].name.should.be.a('string');
                    storage.items[0].id.should.be.a('number');
                    storage.items[0].name.should.equal('Tomatoes');
                    storage.items[1].name.should.equal('Peppers');
                    storage.items[2].name.should.equal('Kale');*/
                    done();
                });
            });
    });
    
    /*it('Should not post to an id that exists', function(done) {
        chai.request(app)
            .post('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.body.id.should.not.equal(3);
                res.body.id.should.not.equal(5);
                res.body.id.should.equal(4);
                done();
            });
    });
    
    it('Should not post without body data', function(done) {
        chai.request(app)
            .post('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.have.body;
                done()
            });
    });*/

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});