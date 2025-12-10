import { useRecoilState } from "recoil";
import { signupAtom } from "../recoil/signupAtom";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  
  const [signupData, setSignupData] = useRecoilState(signupAtom);

  const { email, password, otp, generatedOtp, error } = signupData;

  
  const generateOTP = () => {
    if (!email || !password) {
      setSignupData((prev) => ({
        ...prev,
        error: "Please enter Email & Password first.",
      }));
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);

    console.log("📌 Your Signup OTP is:", newOtp); // Show OTP in console

    setSignupData((prev) => ({
      ...prev,
      generatedOtp: newOtp,
      error: "",
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!generatedOtp) {
      setSignupData((prev) => ({
        ...prev,
        error: "Please generate OTP by filling Email & Password.",
      }));
      return;
    }

    if (parseInt(otp) !== generatedOtp) {
      setSignupData((prev) => ({
        ...prev,
        error: "Invalid OTP. Check console.",
      }));
      return;
    }

    // Save user details
    localStorage.setItem(
      "todoUser",
      JSON.stringify({ email, password })
    );

    alert("Signup Successful!");

    // Clear signup data
    setSignupData({
      email: "",
      password: "",
      otp: "",
      generatedOtp: null,
      error: "",
    });

    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #2b0040, #10001f)",
      }}
    >
      <div className="bg-[#080012] p-12 rounded-2xl shadow-xl border border-purple-500 w-[430px] text-white">

        <h1 className="text-3xl font-semibold text-center mb-8">SignUp</h1>

        <form onSubmit={handleSignup} className="space-y-7">
          {/* EMAIL */}
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setSignupData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
                generateOTP();
              }}
              className="w-full rounded-full px-5 py-3 bg-[#f7eaff] text-black mt-1 outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setSignupData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
                generateOTP();
              }}
              className="w-full rounded-full px-5 py-3 bg-[#f7eaff] text-black mt-1 outline-none"
              required
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm">OTP</label>
            <input
              type="number"
              value={otp}
              onChange={(e) =>
                setSignupData((prev) => ({
                  ...prev,
                  otp: e.target.value,
                }))
              }
              className="w-full rounded-full px-5 py-3 bg-[#f7eaff] text-black mt-1 outline-none"
              placeholder="Enter OTP (Check Console)"
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-400 text-center text-sm -mt-4">{error}</p>
          )}

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#e8cffd] text-purple-900 font-semibold"
          >
            SignUp
          </button>
        </form>

        <p className="text-center mt-5 text-sm">Already Have an account?</p>
        <p className="text-center mt-1">
          <Link to="/login" className="text-purple-400 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
