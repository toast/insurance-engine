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
                .expect(200)
                .end(done);
        });
    });
});
