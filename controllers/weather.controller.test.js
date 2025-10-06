const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const service = require("../services/weather.service")
const temperature = require("../models/temperature")
test("average temperature in province unit test",()=>{
    const body = {"province":"ON","date":"2025-04-14"}    
    const req = {body}
    const getAverage = jest.fn()
    getAverage.mockReturnValue({minAverage:2,maxAverage:13})
    const result = getAverage(req,null)
    expect(result.minAverage).toBe(2)
    expect(result.maxAverage).toBe(13)
})
test("average temperature in province integration test",async ()=>{
    setup()
    let temp = new temperature({max_temp:23,min_temp:-18,city:'Monaco',province:'ON',date:'2025-08-04'})
    await temp.save()
    temp = new temperature({max_temp:22,min_temp:20,city:'Monaco',province:'ON',date:'2025-08-04'})
    await temp.save()
    temp = new temperature({max_temp:21,min_temp:2,city:'Monaco',province:'ON',date:'2025-08-05'})
    await temp.save()
    result = await service.getAverage("ON","2025-08-04")
    expect(result).not.toBe(undefined)
    expect(result.min_avg).toBe(1)
    teardown()
})
setup = async () =>{
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
}
teardown = async () =>{
        await mongoose.disconnect();
        await mongoServer.stop();
    
}