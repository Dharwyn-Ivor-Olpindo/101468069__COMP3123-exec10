# React Redux & JWT Authentication Demo

A lightweight React application built with **Redux Toolkit**, **React Redux**, and **JSON Web Tokens (JWT)** to demonstrate predictable global state management and stateless token-based authentication.

---

## Core Concepts Covered

### 1. Redux Architecture (The 6 Pillars)
* **0 - State:** Represented by `initialState` in `src/store/authSlice.js` (`token`, `user`, `isAuthenticated`). It acts as the single source of truth for authentication status.
* **1 - Store:** Configured in `src/store/store.js` using `configureStore()`, centralizing the state tree and providing it to React via `<Provider>`.
* **2 - Reducer:** Pure functions inside `authSlice` (`loginSuccess` and `logout`) that compute the next state immutably when actions are received.
* **3 - Action:** Auto-generated action objects (`auth/loginSuccess` with the JWT string as `payload`, and `auth/logout`).
* **4 - Dispatch:** Triggered in `src/App.jsx` via `useDispatch()` when the user submits the login form or clicks logout.
* **5 - Subscribe:** Demonstrated both via `store.subscribe()` in `store.js` (logging state transitions to the console) and `useSelector()` in `App.jsx` (automatically re-rendering the UI when `state.auth` changes).

### 2. JSON Web Token (JWT)
A JWT consists of three Base64Url-encoded sections separated by dots (`Header.Payload.Signature`):
1. **Header (Red):** Metadata specifying the token type (`JWT`) and signing algorithm (`HS256`).
2. **Payload (Purple):** User claims (`sub`, `name`, `role`, `iat`, `exp`). Decoded on the client to display user details without an extra database query.
3. **Signature (Blue):** Cryptographic signature verifying token integrity.

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd redux-jwt-lab