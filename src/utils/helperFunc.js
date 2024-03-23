export function setTokenCookie(token) {
  // Set an expiration date for the cookie (e.g., 7 days from the current time).
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Set the number of days you want.

  // Construct the cookie string with the access token value and the expiration date.
  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; secure; path=/`;
}

export function getTokenCookie() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "token") {
      return decodeURIComponent(value);
    }
  }
  return null;
}
export function clearTokenCookie() {
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("isAdmin");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/";
}
export function formatToIndianCurrency(number) {
  return "₹ " + number.toLocaleString("en-IN");
}
