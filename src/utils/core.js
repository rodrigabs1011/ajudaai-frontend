let headers = {
  "Content-type": "application/json",
};

if (localStorage.getItem("AJUDAAI_SESSION_TOKEN")) {
  headers["Authorization"] = `Token ${localStorage.getItem(
    "AJUDAAI_SESSION_TOKEN"
  )}`;
}

export { headers };

export function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export function get_or_create_token() {
  if (!localStorage.getItem("AJUDAAI-SESSION-TOKEN")) {
    localStorage.setItem(
      "AJUDAAI-SESSION-TOKEN",
      Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2)
    );
  }
  return localStorage.getItem("AJUDAAI-SESSION-TOKEN");
}

export function handleAskForLogin({isAnonymous, isAuthenticated, setAskForLoginVisible}) {
  if(!isAnonymous && !isAuthenticated) {
    setAskForLoginVisible(true);
    return false;
  }
  return true;
}

export const defaultAnimDuration = ".4s";
