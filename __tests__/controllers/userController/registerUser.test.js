import userFeatures from "../../controllers/UserController"
import UserModel from "../../models/UserModel"

jest.mock("../../models/UserModel")

it("shoud register a user",async ()=>{
    // express request object mocking
    const req = {
        body:{username:"testname",mail:"test@mail.com",password:"123"}
    }
    // express response object mocking
    const res = {
        status:jest.fn(x=>x),
        json:jest.fn(x=>x),
    }
    // mocking the behaviour of the create function
    const mockCreateUser = UserModel.create.mockImplementationOnce(()=> Promise.resolve({_id:"64f1c6b95d89f8d6f589a292",acknowledgment:true}))
    await userFeatures.registerUser(req,res)
    // if mocking of create function is right, then it will be called with the mocked request body object
    expect(mockCreateUser).toHaveBeenCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({success:true,message:"Account created successfully!"})
})
it("shoud not register a user",async ()=>{
    // express request object mocking
    const req = {
        body:{mail:"test@mail.com",password:"123"}
    }
    // express response object mocking
    const res = {
        status:jest.fn(x=>x),
        json:jest.fn(x=>x),
    }
    // mocking the behaviour of the create function
    const mockCreateUser = UserModel.create.mockImplementationOnce(()=> {})
    await userFeatures.registerUser(req,res)
    // if mocking of create function is right, then it will be called with the mocked request body object
    expect(mockCreateUser).not.toHaveBeenCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({success:false,message:"All fields required!"})
})