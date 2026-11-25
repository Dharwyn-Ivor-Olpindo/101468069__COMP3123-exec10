import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "./store/authSlice";
import { generateMockJwt } from "./utils/mockJwt";

function App() {
  const [username, setUsername] = useState("Dharwyn");
  const [role, setRole] = useState("Developer");

  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    const jwt = generateMockJwt(username, role);
    dispatch(loginSuccess(jwt));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const tokenParts = token ? token.split(".") : [];

  return (
    <div className="container">
      <h1>React Redux + JWT Auth Demo</h1>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="card">
          <h2>Sign In to Generate JWT</h2>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </label>
          <label>
            Role Claim
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Developer">Developer</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </label>
          <button type="submit">Dispatch Login Action</button>
        </form>
      ) : (
        <div className="card">
          <div className="header-row">
            <h2>Authenticated Dashboard</h2>
            <button onClick={handleLogout} className="logout-btn">
              Dispatch Logout
            </button>
          </div>

          <p>
            <strong>Status:</strong> Authenticated via Redux Store
          </p>

          <h3>Encoded JWT (Header . Payload . Signature)</h3>
          <div className="token-box">
            <span className="jwt-header">{tokenParts[0]}</span>.
            <span className="jwt-payload">{tokenParts[1]}</span>.
            <span className="jwt-sig">{tokenParts[2]}</span>
          </div>

          <h3>Decoded JWT Claims (Stored in Redux State)</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <h3>Simulated Protected API Header</h3>
          <code>Authorization: Bearer {token.slice(0, 28)}...</code>
        </div>
      )}
    </div>
  );
}

export default App;