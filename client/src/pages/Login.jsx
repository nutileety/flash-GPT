import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) =>{
      e.preventDefault();
    }

  return (
    <div>
      <form onSubmit={handleSubmit} 
      className="flex flex-col text-[13px] gap-3 m-auto items-start p-8 py-6 max-w-fit sm:w-[352px]
       text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-xl font-medium m-auto">
            <span className="text-orange-600">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
            <div className="w-full">
                <p>Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} 
                placeholder="type here" 
                className="border border-gray-200 hover:border-orange-400 rounded max-w-fit p-1 pl-2 mt-1 outline-orange-600" 
                type="text" required />
            </div>
        )}
        <div className="w-full ">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} 
            placeholder="type here" 
            className="border border-gray-200 hover:border-orange-400 rounded w-full p-1 pl-2 mt-1 outline-orange-600" 
            type="email" required />
        </div>
        <div className="w-full ">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} 
            placeholder="type here" 
            className="border border-gray-200 hover:border-orange-400 rounded w-full p-1 pl-2 mt-1 outline-orange-600" 
            type="password" required />
        </div>
        {state === "register" ? (
            <p>
                Already have account? 
                <span onClick={() => setState("login")} 
                className="text-orange-600 cursor-pointer">click here</span>
            </p>
        ) : (
            <p>
                Create an account?
                <span onClick={() => setState("register")} 
                className="text-orange-600 cursor-pointer">click here</span>
            </p>
        )}
        <button type='submit' className="bg-orange-600 hover:bg-orange-800 transition-all
         text-white w-full py-1.5 rounded-md cursor-pointer">
            {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login