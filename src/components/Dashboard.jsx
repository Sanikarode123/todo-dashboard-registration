// Dashboard.jsx
import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { authAtom } from "../recoil/authAtom";
import { dashboardAtom } from "../recoil/dashboardAtom";

import ViewProfile from "./settings/ViewProfile";
import EditProfile from "./settings/EditProfile";
import UploadImage from "./settings/UploadImage";

import { Link } from "react-router-dom";

// Task 4 imports
import { useTodosReducer } from "../hooks/useTodosReducer";
import { useTheme } from "../hooks/useTheme";

export default function Dashboard() {
  const auth = useRecoilValue(authAtom);
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);

  // Task 4 logic
  const { todos, dispatch, ACTIONS } = useTodosReducer();
  const { theme, toggleTheme } = useTheme();

  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ----------------------- MAIN CONTENT -----------------------
  const renderContent = () => {
    if (dashboard.section !== "settings") {
      if (dashboard.section === "myday") {
        return (
          <div className="flex-1">

            {/* Theme Toggle */}
            <div className="flex justify-end p-4">
              <button
                onClick={toggleTheme}
                className="px-3 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
              </button>
            </div>

            {/* Header */}
            <div className="w-[85%] mx-auto bg-purple-300 rounded-3xl shadow-lg border-2 border-purple-700 p-16">
              <h1 className="text-3xl font-semibold text-white">My Day</h1>
              <p className="text-white mt-1">{new Date().toDateString()}</p>
            </div>

            {/* Todo Section */}
            <div className="mt-6 p-6">

              {/* Input Box */}
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Enter task..."
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  className="border rounded-md p-2 flex-1"
                />

                <button
                  onClick={() => {
                    if (taskText.trim() === "") return;

                    if (editingId) {
                      // Editing existing task
                      dispatch({
                        type: ACTIONS.EDIT,
                        payload: { id: editingId, text: taskText },
                      });
                      setEditingId(null);
                    } else {
                      // Add new task
                      dispatch({
                        type: ACTIONS.ADD,
                        payload: taskText,
                      });
                    }

                    setTaskText("");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>

              {/* Todo List */}
              {todos.length === 0 ? (
                <p className="text-gray-700">No tasks yet — add one.</p>
              ) : (
                <ul className="space-y-2">
                  {todos.map((t) => (
                    <li
                      key={t.id}
                      className="bg-white shadow p-3 rounded-md flex justify-between items-center"
                    >
                      {/* Toggle Complete */}
                      <span
                        onClick={() =>
                          dispatch({ type: ACTIONS.TOGGLE, payload: t.id })
                        }
                        className={`cursor-pointer ${
                          t.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {t.text}
                      </span>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingId(t.id);
                            setTaskText(t.text);
                          }}
                          className="text-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            dispatch({ type: ACTIONS.DELETE, payload: t.id })
                          }
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      }

      if (dashboard.section === "important")
        return <div className="p-6 text-xl">Important Page</div>;

      if (dashboard.section === "planned")
        return <div className="p-6 text-xl">Planned Page</div>;

      if (dashboard.section === "tasks")
        return <div className="p-6 text-xl">Tasks Page</div>;
    }

    // Settings Section
    if (dashboard.section === "settings") {
      if (dashboard.settingsPage === "view") return <ViewProfile />;
      if (dashboard.settingsPage === "edit") return <EditProfile />;
      if (dashboard.settingsPage === "upload") return <UploadImage />;
    }

    return null;
  };

  // ----------------------- UI -----------------------
  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-50"}`}>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-md">
        <h1 className="text-lg font-semibold">To Do Application</h1>
        <p className="text-sm text-gray-600">Welcome {auth.email}</p>

        <nav className="mt-8 space-y-4 text-gray-800">

          <button
            className={`block w-full text-left ${
              dashboard.section === "myday" ? "font-bold text-purple-600" : ""
            }`}
            onClick={() =>
              setDashboard((prev) => ({ ...prev, section: "myday" }))
            }
          >
            ☀ My Day
          </button>

          <button
            className={`block w-full text-left ${
              dashboard.section === "important" ? "font-bold text-purple-600" : ""
            }`}
            onClick={() =>
              setDashboard((prev) => ({ ...prev, section: "important" }))
            }
          >
            ⭐ Important
          </button>

          <button
            className={`block w-full text-left ${
              dashboard.section === "planned" ? "font-bold text-purple-600" : ""
            }`}
            onClick={() =>
              setDashboard((prev) => ({ ...prev, section: "planned" }))
            }
          >
            📅 Planned
          </button>

          <button
            className={`block w-full text-left ${
              dashboard.section === "tasks" ? "font-bold text-purple-600" : ""
            }`}
            onClick={() =>
              setDashboard((prev) => ({ ...prev, section: "tasks" }))
            }
          >
            📋 Tasks
          </button>

          <Link
            to="/products"
            className="block w-full text-left hover:text-purple-600"
          >
            🛒 Products
          </Link>

          <Link
            to="/register-wizard"
            className="block w-full text-left hover:text-purple-600"
          >
            📝 Registration Wizard
          </Link>

          {/* Settings */}
          <div className="mt-6 pt-4 border-t">
            <button
              className={`block w-full text-left ${
                dashboard.section === "settings" ? "font-bold text-purple-600" : ""
              }`}
              onClick={() =>
                setDashboard((prev) => ({ ...prev, section: "settings" }))
              }
            >
              ⚙ Settings
            </button>

            {dashboard.section === "settings" && (
              <div className="ml-4 mt-2 space-y-2 text-sm">
                <button
                  onClick={() =>
                    setDashboard((prev) => ({ ...prev, settingsPage: "view" }))
                  }
                >
                  View Profile
                </button>

                <button
                  onClick={() =>
                    setDashboard((prev) => ({ ...prev, settingsPage: "edit" }))
                  }
                >
                  Edit Profile
                </button>

                <button
                  onClick={() =>
                    setDashboard((prev) => ({ ...prev, settingsPage: "upload" }))
                  }
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>

          <button className="text-blue-600 mt-6">Log out</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
