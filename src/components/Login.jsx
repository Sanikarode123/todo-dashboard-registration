import { useRecoilState } from "recoil";
import { loginAtom } from "../recoil/loginAtom";
import { authAtom } from "../recoil/authAtom";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  
  const [loginState, setLoginState] = useRecoilState(loginAtom);


  const [auth, setAuth] = useRecoilState(authAtom);

  const { email, password, error } = loginState;

  const handleLogin = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("todoUser"));

    if (!saved) {
      setLoginState((prev) => ({
        ...prev,
        error: "You must sign up first!",
      }));
      return;
    }

    if (saved.email === email && saved.password === password) {
      setAuth({
        isAuthenticated: true,
        user: saved,
      });

      
      setLoginState({
        email: "",
        password: "",
        error: "",
      });

      navigate("/dashboard");
    } else {
      setLoginState((prev) => ({
        ...prev,
        error: "Invalid Credentials",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#16002B]">
      <div className="bg-[#0B0014] text-white p-10 w-[420px] rounded-2xl shadow-xl border border-purple-500">
        <h1 className="text-3xl text-center font-semibold mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-7">

          {/* EMAIL */}
          <div>
            <label className="text-lg">Email</label>
            <input
              className="w-full mt-2 p-3 rounded-full bg-[#f5e6ff] text-black outline-none"
              type="email"
              value={email}
              onChange={(e) =>
                setLoginState((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-lg">Password</label>
            <input
              className="w-full mt-2 p-3 rounded-full bg-[#f5e6ff] text-black outline-none"
              type="password"
              value={password}
              onChange={(e) =>
                setLoginState((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-400 text-center -mt-2">{error}</p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#dbb4ff] text-purple-900 font-semibold"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center">Have not account yet?</p>
        <p className="text-center mt-2">
          <Link to="/signup" className="text-purple-400">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
