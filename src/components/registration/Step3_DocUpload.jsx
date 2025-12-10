// src/components/registration/Step3_DocUpload.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { registrationAtom } from '../../recoil/registrationAtom';

export default function Step3({ next, back }) {
  const [regData, setRegData] = useRecoilState(registrationAtom);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegData((prev) => ({
      ...prev,
      document: file,
    }));
  };

  return (
    <div className="space-y-4">
      <label className="block mb-1">Upload Document</label>
      <input type="file" onChange={handleFileChange} className="border p-2 w-full" />

      <div className="flex justify-between space-x-2">
        <button onClick={back} className="px-4 py-2 bg-gray-300 rounded">
          Back
        </button>
        <button onClick={next} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
}
