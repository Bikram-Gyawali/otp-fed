import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [inputCode, setInputCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [params, setParam] = useState();
  const [isValidated, setIsValidated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    console.log("here", index, inputValue, e.key);
    if (e.key === "Backspace" || e.key === "Delete") {
      console.log("here", index, e.key);
      const newInputCode = [...inputCode];
      newInputCode[index] = "";
      setInputCode(newInputCode);
      setCurrentIndex(index);

      if (index > 0) {
        const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    } else {
      const newInputCode = [...inputCode];
      newInputCode[index] = inputValue;
      setInputCode(newInputCode);
      setCurrentIndex(index + 1);

      if (inputValue && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    //check if proper digit and length of 6

    if (!/^\d{6}$/.test(pastedData)) {
      setError("Please enter a valid code.");
      return;
    }

    if (pastedData.length > 6 || pastedData.length < 6) {
      setError("Please enter a valid code.");
      return;
    }

    const newInputCode = pastedData.split("").slice(0, 6);
    setInputCode(newInputCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValidated(true);

    const hasEmptyInput = inputCode.some((value) => value === "");
    if (hasEmptyInput) {
      setError("Please enter a complete code.");
      return;
    }

    const codeString = inputCode.join("");

    const options = {
      url: "http://localhost:3000/api/verify",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { code: codeString },
    };

    axios(options)
      .then((response) => {
        if (response.status === 200) {
          navigate("/success");
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          setError("Verification Error: Invalid code, please try again.");
        } else {
          console.log("error", error.response.data.error);
          setError(error.response.data.error);
        }
      });
  };

  useEffect(() => {}, [inputCode, params]);

  return (
    <div>
      {/* component */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-2">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-2xl">
                <p className="heading2">Verification Code:</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2 px-4 ">
                  <div className="flex flex-row items-center justify-between mx-auto gap-2 ">
                    {inputCode.map((value, index) => (
                      <div key={index} className="w-10 h-10">
                        <input
                          maxLength={1}
                          data-index={index}
                          className={`w-full h-full flex flex-col items-center justify-center text-center outline-none rounded border border-gray-200 ${
                            isValidated && value === ""
                              ? "border-red-500"
                              : "border-gray-200"
                          } text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700`}
                          type="text"
                          autoFocus={index === currentIndex}
                          value={value}
                          pattern="\d*"
                          onChange={(e) => handleInputChange(e, index)}
                          onPaste={handlePaste}
                        />
                      </div>
                    ))}
                  </div>
                  {error && (
                    <div className="text-white text-center font-semibold bg-red-600 p-2 w-9/12 m-auto rounded">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col space-y-5">
                    <div className="m-auto text-center w-full">
                      <button
                        type="submit"
                        className="btnfont btn btn-wide bg-blue-950 rounded hover:bg-black shadow-sm text-white rounded-1xl px-8 py-3 w-2/4"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;