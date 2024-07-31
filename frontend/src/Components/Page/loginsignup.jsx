// import React, { useState } from "react";
// import "./loginsignup.css";

// const LoginSignup = () => {
//   const [state, setState] = useState("Employee Login");
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   console.log("REACT_APP_HIT_URL:", process.env.REACT_APP_HIT_URL);

//   const submitHandler = async () => {
//     const url = state === "Employee Login"
//       ? `${process.env.REACT_APP_HIT_URL}/api/login`
//       : `${process.env.REACT_APP_HIT_URL}/api/signup`;

//     console.log("Request URL:", url); 
//     if (state === "Employee Signup" && !formData.email.endsWith('@gmail.com')) {
//       alert('Email domain must be @gmail.com');
//       return;
//     }

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const dataObj = await response.json();
//       if (response.ok) {
//         localStorage.setItem('auth-token', dataObj.token);
//         sessionStorage.setItem('email', formData.email);
//         sessionStorage.setItem('username', formData.username);
//         window.location.replace("/dashboard"); 
//       } else {
//         alert(dataObj.errors);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="App">
//       <h1 className="raj">BudgetBuddy</h1>
//       <div className="loginsignup">
//         <div className="loginsignup-container">
//           <h1>{state}</h1>
//           <div className="loginsignup-fields">
//             {state === "Employee Signup" && (
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 name="username"
//                 value={formData.username}
//                 onChange={changeHandler}
//               />
//             )}
//             <input
//               type="email"
//               placeholder="Email address"
//               name="email"
//               value={formData.email}
//               onChange={changeHandler}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={formData.password}
//               onChange={changeHandler}
//             />
//           </div>
//           <button onClick={submitHandler}>Continue</button>
//           {state === "Employee Login" ? (
//             <p className="loginsignup-login">
//               Create an account? <span onClick={() => setState("Employee Signup")}>Click here</span>
//             </p>
//           ) : (
//             <p className="loginsignup-login">
//               Already have an account? <span onClick={() => setState("Employee Login")}>Login here</span>
//             </p>
//           )}
//           <div className="loginsignup-agree">
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

import React, { useState } from "react";
import "./loginsignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // Changed to "Login"
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("REACT_APP_HIT_URL:", process.env.REACT_APP_HIT_URL);

  const submitHandler = async () => {
    const url = state === "Login"
      ? `${process.env.REACT_APP_HIT_URL}/api/login`
      : `${process.env.REACT_APP_HIT_URL}/api/signup`;

    console.log("Request URL:", url); 
    if (state === "Signup" && !formData.email.endsWith('@gmail.com')) {
      alert('Email domain must be @gmail.com');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const dataObj = await response.json();
      if (response.ok) {
        localStorage.setItem('auth-token', dataObj.token);
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('username', formData.username);
        window.location.replace("/dashboard"); 
      } else {
        alert(dataObj.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1 className="raj">BudgetBuddy</h1>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Signup" && (
              <input
                type="text"
                placeholder="Your name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>
          <button onClick={submitHandler}>Continue</button>
          {state === "Login" ? (
            <p className="loginsignup-login">
              Create an account? <span onClick={() => setState("Signup")}>Click here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Already have an account? <span onClick={() => setState("Login")}>Login here</span>
            </p>
          )}
          <div className="loginsignup-agree">
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
