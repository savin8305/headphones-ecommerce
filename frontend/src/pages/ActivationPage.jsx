import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const history =useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  const handleLoginClick = () => {
    history.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-md py-10 px-10 bg-white rounded-lg shadow-2xl transform -rotate-6">
        <h1 className="text-4xl font-bold mb-5 text-gray-900 leading-tight">
          {error ? 
            <span>Oh no! <br/> Token Expired</span> :
            <span>Congratulations! <br/> Your Account is Now Active</span>
          }
        </h1>
        <p className="text-gray-600 text-lg mb-5">
          {error ? 
            "Sorry, your token is either invalid or expired. Please try again with a valid token." :
            "You are now ready to take advantage of all our features and start your journey with us!"
          }
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleLoginClick}>
          {error ? "Resend Token" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default ActivationPage;
