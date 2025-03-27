export function login(token) {
  localStorage.setItem("token", token);
}
export function Logout() {
  localStorage.removeItem("token");
  window.location.href="/"
}

export const token = localStorage.getItem("token");
