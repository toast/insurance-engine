var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var express = require('express');
var app = require('../../app');

describe('app', function(){
    describe('messages', function(){
        it('should process', function(done){
            request(app)
                .post('/messages')
                .send({text: "insure car", id: ""})
                .expect(200)
                .expect('{"text":"Although we do not insure insure car at the moment - we hope to bring you this cover soon"}')
                .end(done);
        });
    });
});
