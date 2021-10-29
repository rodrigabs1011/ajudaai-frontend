

let headers = {
  "Content-type": "application/json",
};

if (localStorage.getItem("AJUDAAI_SESSION_TOKEN")) {
  headers["Authorization"] = `Token ${localStorage.getItem("AJUDAAI_SESSION_TOKEN")}`;
}

export { headers };

export function sort_by_key(array, key){
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}


export const defaultAnimDuration = '.4s';
