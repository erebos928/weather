const weatherController = require("../controllers/weather.controller");
const weatherService = require("../services/weather.service");

// MUST be at the top level to work properly
jest.mock("../services/weather.service");

describe("Weather Controller Unit Tests", () => {
    test("getAverage should return 200 and JSON data on success", async () => {
        // Setup Mocks
        const req = { body: { province: "ON", date: "2025-04-14" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Tell the mock what to return
        weatherService.getAverage.mockResolvedValue({
            minAverage: 2,
            maxAverage: 13
        });

        // Execute
        await weatherController.getAverage(req, res);

        // Verify
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            minAverage: 2,
            maxAverage: 13
        });
    });
});