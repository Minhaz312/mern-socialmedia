export default function has(data,key) {
  if(data[key]==="" || data[key]===undefined || data[key]===null) return false
  else return true
}
