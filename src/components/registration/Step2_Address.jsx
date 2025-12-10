// src/components/registration/Step2_Address.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { registrationAtom } from '../../recoil/registrationAtom';

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postalCode: Yup.string().required('Postal code is required'),
  // add more address fields if needed
});

export default function Step2({ next, back }) {
  const [regData, setRegData] = useRecoilState(registrationAtom);

  return (
    <Formik
      initialValues={{
        addressLine1: regData.address.addressLine1 || '',
        addressLine2: regData.address.addressLine2 || '',
        city: regData.address.city || '',
        state: regData.address.state || '',
        postalCode: regData.address.postalCode || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setRegData((prev) => ({
          ...prev,
          address: values,
        }));
        next();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label className="block mb-1">Address Line 1</label>
            <Field name="addressLine1" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="addressLine1" /></div>
          </div>

          <div>
            <label className="block mb-1">Address Line 2 (optional)</label>
            <Field name="addressLine2" className="border p-2 w-full" />
          </div>

          <div>
            <label className="block mb-1">City</label>
            <Field name="city" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="city" /></div>
          </div>

          <div>
            <label className="block mb-1">State</label>
            <Field name="state" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="state" /></div>
          </div>

          <div>
            <label className="block mb-1">Postal Code</label>
            <Field name="postalCode" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="postalCode" /></div>
          </div>

          <div className="flex justify-between space-x-2">
            <button type="button" onClick={back} className="px-4 py-2 bg-gray-300 rounded">
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
