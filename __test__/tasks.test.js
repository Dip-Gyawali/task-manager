const {getallTasks} = require('../controller/tasks');

const mockRequest = {}
const mockResponse = {
    status: jest.fn(),
    json: jest.fn()
}

describe("Get all user",()=>{
    it("Should Give all the user data",()=>{
       getallTasks(mockRequest,mockResponse)
       expect(mockResponse.status).toHaveBeenCalled(200);
    })
})