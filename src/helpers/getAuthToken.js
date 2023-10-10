export default function getAuthToken() {
  const token = localStorage.getItem("one_token")
  const user = localStorage.getItem("one_user")
  return {token,user}
}
