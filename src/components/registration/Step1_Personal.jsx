// src/components/registration/Step1_Personal.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { registrationAtom } from '../../recoil/registrationAtom';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  // add more personal detail fields as needed
});

export default function Step1({ next }) {
  const [regData, setRegData] = useRecoilState(registrationAtom);

  return (
    <Formik
      initialValues={{
        firstName: regData.personal.firstName || '',
        lastName: regData.personal.lastName || '',
        email: regData.personal.email || '',
        phone: regData.personal.phone || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setRegData((prev) => ({
          ...prev,
          personal: values,
        }));
        next();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label className="block mb-1">First Name</label>
            <Field name="firstName" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="firstName" /></div>
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <Field name="lastName" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="lastName" /></div>
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Field name="email" type="email" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="email" /></div>
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <Field name="phone" className="border p-2 w-full" />
            <div className="text-red-500 text-sm"><ErrorMessage name="phone" /></div>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
