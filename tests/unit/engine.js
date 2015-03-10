var chai = require('chai');
var expect = chai.expect;
var engine = require('../../app/engine');

describe('engine', function(){
    describe('ignore', function(){
        it('car insurance', function(){
            var result = engine.process({text: 'car insurance'});
            expect(result.text).to.equal("I'm afraid we only offer: home, gadget, and bike insurance at the moment.");
        });
    });
});

