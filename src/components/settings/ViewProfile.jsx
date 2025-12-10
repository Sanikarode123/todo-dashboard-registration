import React from "react";
import useProfile from "../../hooks/useProfile";

export default function ViewProfile() {
  const { profile } = useProfile();

  return (
    <div className="w-full h-full p-6">

      {/* TWO MAIN CARDS SIDE BY SIDE */}
      <div className="flex gap-6">

        {/* LEFT CARD — ABOUT ME */}
        <div className="w-1/3 bg-purple-50 rounded-xl p-4 shadow border border-purple-200">

          {/* Avatar */}
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

          {/* ABOUT ME SECTION */}
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

        {/* RIGHT CARD — PROFILE INFORMATION */}
        <div className="w-2/3 bg-white rounded-xl p-5 shadow border border-gray-200">

          {/* Header */}
          <h2 className="text-base font-semibold mb-3">
            Profile Information
          </h2>

          {/* FIELD BLOCKS LIKE YOUR UI */}
          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold block">Full Name</label>
              <div className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2">
                {profile.name || ""}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold block">Phone</label>
              <div className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2">
                {profile.phone || ""}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-semibold block">Address</label>
              <div className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 min-h-[42px]">
                {profile.address || ""}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold block">Email</label>
              <div className="mt-1 w-full bg-gray-200 border border-gray-400 rounded px-3 py-2">
                {profile.email || ""}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
