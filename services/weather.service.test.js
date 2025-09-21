const service = require("./weather.service");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const temperature = require("../models/temperature");
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
  test("service save temperature test", async () => {
  const params = {
    date: "2025-02-03",
    max_temp: 21,
    min_temp: 2,
    city: "Hunululu",
    province: "ZZZ",
  };
  const temp = await service.createTemprature(params);
  const found = await temperature.findOne({ province: "ZZZ" });
  expect(found).not.toBeNull();
  expect(found.city).toBe("Hunululu");
  
});
  test("service hottest city", async () => {
  const params = {
    date: "2025-02-03",
    province: "ZZZ",
  };
  try{
  await temperature.insertMany([{max_temp:25,min_temp:-2,date:'2025-02-03',province:'ZZZ',city:'Jabolgha'}]);
  const found = await service.getHottestCity(params);
  expect(found).not.toBeNull();
  expect(found.city).toBe("Jabolgha");
  }
  catch(error){
    console.log(error);
  }
});
