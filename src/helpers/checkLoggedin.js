export default function checkLoggedin() {
  if(localStorage.getItem("one_auth")===null) return false;
  else return true;
}
