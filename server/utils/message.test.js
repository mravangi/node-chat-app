var expect = require('expect');

var { generateMessage , generateLocationMessage } = require('./message');

describe('Generate Message' , ()=>{
    it('Should generate correct message object' , ()=>{
        var from = 'Mostafa';
        var text = 'this is test message';
        var message = generateMessage(from , text);

        expect(typeof message.createAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from , text}))

    })
})

describe('Generate Location Message' , ()=>{
    it('Should generate correct location message object', ()=>{
        from = "mohammad";
        latitude = 434;
        longitude = 23;
        url = "https://www.google.com/maps?q=432,23";

        var locationMessage = generateLocationMessage(from, latitude , longitude);

        expect(typeof locationMessage.createAt).toBe('number');
        expect(locationMessage).toEqual(expect.objectContaining({from , url}))
    })
})

