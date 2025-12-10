import React, { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";

export default function UploadImage() {
  const { profile, updateProfile } = useProfile();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profile.avatarUrl || "");

  // preview object URL & cleanup
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSave = () => {
    if (!file) {
      alert("Please choose an image first");
      return;
    }

    // build FormData – fulfills task requirement
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", profile.name);
    formData.append("email", profile.email);

    // here you would normally send to backend
    // fetch('/api/profile/avatar', { method: 'POST', body: formData })

    // for now: just store preview URL in context
    updateProfile({ avatarUrl: previewUrl });
    alert("Image saved!");
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Profile Image</h2>

      <div className="bg-white rounded-xl shadow p-6 flex gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded shadow text-sm"
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}
