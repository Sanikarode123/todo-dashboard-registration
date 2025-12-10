// src/components/registration/Step4_ReviewSubmit.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { registrationAtom } from '../../recoil/registrationAtom';

export default function Step4({ back }) {
  const [regData, setRegData] = useRecoilState(registrationAtom);

  const handleSubmit = () => {
    console.log("Final Submitted Data:", regData);

    alert("🎉 Registration Completed Successfully!");

    // Optional: Reset the form data
    setRegData({
      personal: {},
      address: {},
      document: null,
    });

    // Optional: Redirect to dashboard or registration start
    window.location.href = "/dashboard";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Review Your Details</h2>

      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(regData, null, 2)}
      </pre>

      <div className="flex justify-between space-x-2 mt-4">
        <button
          onClick={back}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
