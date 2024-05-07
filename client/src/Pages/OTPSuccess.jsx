import React from "react";

function OTPSuccess() {
  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-2">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-2xl">
                <p className="heading2 text-green-600 ">
                  OTP Verification Successful
                </p>
              </div>
            </div>
            <div>
              <button className="btnfont btn btn-wide bg-blue-950 rounded hover:bg-black shadow-sm text-white rounded-1xl px-8 py-3 w-2/4" onClick={() => window.location.href = "/"} >
                Go back{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPSuccess;
