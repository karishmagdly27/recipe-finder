import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login } from '../utils/authService';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()
  const loginMutation = useMutation(login);

  const handleLogin = async () => {
    try {
      if (email==="" || password === '') {
        setError('Please enter a valid email and password.');
      } else {
        setError('');
        let credentials = { email, password }
        const res = await loginMutation.mutateAsync(credentials);
        if(res.error){
          throw new Error(res.error)
        }
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    navigate("/signup")
  };

  const handleEmail = async (email) => {
    if(!/\S+@\S+\.\S+/.test(email)){
        setError("Please enter valid email")
    }else{
        setError("")
    }
    setEmail(email)
  }

  return (
      <main className='w-full flex flex-col'>
          <div className="bg-gray-200 h-screen flex items-center justify-center">
              <div className="bg-white md:w-[400px] p-8 rounded shadow-md">
                  <h1 className="text-3xl font-bold mb-4">Login</h1>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                      <input
                          type="text"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => handleEmail(e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md"
                      />
                  </div>

                  <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                      <input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md"
                      />
                  </div>

                  <button
                      onClick={handleLogin}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                      Login
                  </button>
                  <button
                      onClick={handleSignUp}
                      className="px-4 py-2 ml-4 rounded-md hover:text-blue-500"
                  >
                      New User?
                  </button>
              </div>
          </div>
      </main>
  );
};

export default Login;
