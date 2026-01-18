const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const service = require("../services/weather.service");
const Temperature = require("../models/temperature");

describe("Weather Service Integration Tests", () => {
    let mongoServer;

    beforeAll(async () => {
        // 1. Create the server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        
        // 2. Connect with options to prevent hanging connections
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        // 3. Close Mongoose FIRST
        if (mongoose.connection) {
            await mongoose.connection.dropDatabase(); // Cleanup
            await mongoose.connection.close();
        }
        // 4. Stop the memory server LAST
        if (mongoServer) {
            await mongoServer.stop({ forceServerClose: true });
        }
    });

    test.skip("should calculate correct average from in-memory database", async () => {
        // Clear collection to ensure clean state
        await Temperature.deleteMany({});

        // Seed
        await Temperature.insertMany([
            { max_temp: 23, min_temp: -18, city: 'Monaco', province: 'ON', date: '2025-08-04' },
            { max_temp: 22, min_temp: 20, city: 'Monaco', province: 'ON', date: '2025-08-04' }
        ]);

        // Execute service call
        const result = await service.getAverage("ON", "2025-08-04");

        // Assertions
        expect(result).toBeDefined();
        expect(result.max_avg).toBe(22.5);
        expect(result.min_avg).toBe(1);
    });
});