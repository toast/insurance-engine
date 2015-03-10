var chai = require('chai');
var expect = chai.expect;
var engine = require('../../app/engine');

describe('engine', function(){
    describe('process', function(){
        it('car insurance', function(){
            var result = engine.process({text: 'car insurance'});
            expect(result.text).to.equal('Although we do not insure car insurance at the moment - we hope to bring you this cover soon');
        });
    });
});

