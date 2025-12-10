import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useProfile from "../../hooks/useProfile";
import { profileSchema } from "../../utils/profileValidation";

export default function EditProfile() {
  const { profile, updateProfile } = useProfile();

  const initialValues = {
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    address: profile.address || "",
    work: profile.work || "",
    country: profile.country || "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    updateProfile({
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      work: values.work,
      country: values.country,
    });

    setSubmitting(false);
    alert("Profile saved!");
  };

  return (
    <div className="w-full h-full p-6">
      {/* This keeps the heading consistent with your design */}
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

      {/* TWO MAIN CARDS SIDE BY SIDE, SAME AS VIEW UI */}
      <div className="flex gap-6">
        {/* LEFT CARD — ABOUT ME (same look as in View Profile) */}
        <div className="w-1/3 bg-purple-50 rounded-xl p-4 shadow border border-purple-200">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden shadow-inner">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>

          <div className="mt-4 text-sm leading-6">
            <p className="font-semibold text-gray-700">About Me :</p>
            <p className="text-gray-700">
              <span className="font-semibold">Work:</span>{" "}
              {profile.work || "Not provided"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Country:</span>{" "}
              {profile.country || "Not provided"}
            </p>
          </div>
        </div>

        {/* RIGHT CARD — EDITABLE FORM, SAME BOX STYLE AS VIEW */}
        <div className="w-2/3 bg-white rounded-xl p-5 shadow border border-gray-200">
          <Formik
            initialValues={initialValues}
            validationSchema={profileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-sm font-semibold block">
                    Full Name
                  </label>
                  <Field
                    name="name"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold block">
                    Phone
                  </label>
                  <Field
                    name="phone"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-semibold block">
                    Address
                  </label>
                  <Field
                    as="textarea"
                    name="address"
                    rows="2"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Work */}
                <div>
                  <label className="text-sm font-semibold block">
                    Work
                  </label>
                  <Field
                    name="work"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="work"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm font-semibold block">
                    Country
                  </label>
                  <Field
                    name="country"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold block">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* SAVE BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 px-4 py-2 bg-purple-500 text-white rounded shadow"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
