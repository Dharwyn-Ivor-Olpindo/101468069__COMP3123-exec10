const base64UrlEncode = (obj) => {
  return btoa(JSON.stringify(obj))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const generateMockJwt = (username, role = "Student") => {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: "101468069",
    name: username,
    role: role,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const mockSignature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
};

export const decodeJwtPayload = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};