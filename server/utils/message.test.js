var expect = require('expect');

var { generateMessage } = require('./message');

describe('Generate Message' , ()=>{
    it('Should generate correct message object' , ()=>{
        var from = 'Mostafa';
        var text = 'this is test message';
        var message = generateMessage(from , text);

        expect(typeof message.createAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from , text}))

    })
})