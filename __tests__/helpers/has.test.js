import has from "../../helper/has"


it("should test a key,value object",()=>{
    expect(has({key:"value"},"key")).toBe(true)
})