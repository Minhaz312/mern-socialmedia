const token = localStorage.getItem("one_auth")
export const formHeaders = {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
}
export const jsonHeaders = {
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
}