const tempDAO = require("./temperature.dao");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const temperature = require("../models/temperature");

describe("save temperature", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  test("save", async () => {
    const temp = new temperature({max_temp:23,min_temp:-18,city:'Monaco',province:'XXX',date:'2025-02-08'});
    await tempDAO.saveTemperature(temp);
    const found = await temperature.findOne({province:'XXX'});
    expect(found).not.toBeNull();
    expect(found.city).toBe('Monaco');
  });
  test("find hottest", async () => {
    await tempDAO.saveTemperature(new temperature({max_temp:23,min_temp:-18,city:'Jabolsa',province:'XXX',date:'2025-02-08'}));
    await tempDAO.saveTemperature(new temperature({max_temp:24,min_temp:-18,city:'Jabolgha',province:'XXX',date:'2025-02-08'}));
    await tempDAO.saveTemperature(new temperature({max_temp:21,min_temp:-18,city:'Hourghalya',province:'XXX',date:'2025-02-08'}));
    const found = await tempDAO.getHottestCity('XXX','2025-02-08');
    expect(found).not.toBeNull();
    expect(found.city).toBe('Jabolgha');
  });
test("average", async () => {
    await tempDAO.saveTemperature(new temperature({max_temp:23,min_temp:9,city:'Monaco',province:'ON',date:'2025-04-24'}))
    await tempDAO.saveTemperature(new temperature({max_temp:3,min_temp:-2,city:'Oakville',province:'ON',date:'2025-04-24'}))
    await tempDAO.saveTemperature(new temperature({max_temp:13,min_temp:12,city:'Quebec',province:'QC',date:'2025-04-24'}))
    const avs = await tempDAO.getAverage("ON","2025-04-24")
    expect(avs).not.toBeNull();
    expect(avs.length).toBeGreaterThan(0)
    expect(avs[0].min_avg).toBe(3.5);
  });
test("delete", async () => {
    const result = await tempDAO.saveTemperature(new temperature({max_temp:23,min_temp:9,city:'Monaco',province:'ON',date:'2025-04-24'}))
    const delResult = await tempDAO.deleteRecord(result._id)
    expect(delResult).not.toBeNull();
    expect(delResult.deletedCount).toBe(1);
  });  
});
