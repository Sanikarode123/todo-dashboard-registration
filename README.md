# React + Vite

# 🚀  React Dashboard Project  
### Todo App + Registration Wizard + Profile Management (Recoil + Formik + Yup + Context + Tailwind)

This project is a complete React-based productivity dashboard that includes:

- ✔️ Multi-Step Registration Wizard (Formik + Yup + Recoil + FormData)
- ✔️ Todo App with CRUD, Mark Complete (useReducer + Recoil + LocalStorage)
- ✔️ Theme Switcher (Light / Dark Mode using Recoil)
- ✔️ User Authentication (Login / Signup)
- ✔️ Profile Management (View / Edit / Upload Image)
- ✔️ Modern UI using Tailwind CSS

---

## 📌 **Features Overview**

### 🔐 **1. User Authentication**
- Login / Signup pages  
- OTP generation (optional demo mode)  
- Auth state managed using **Recoil**

---

### 📝 **2. Multi-Step Registration Wizard (Task 3)**  
Built using:
- **Formik**
- **Yup Validation**
- **Recoil (global registrationAtom)**
- **Custom hook → useStepper()**
- **FormData for document upload**

#### Wizard Steps:
1. **Personal Details**
2. **Address Details**
3. **Document Upload**
4. **Review & Submit**

All data is stored in **Recoil** and displayed on the final review step.

---

### ✅ **3. Todo App with CRUD (Task 4)**  
Built using:
- `useReducer()` → Task state logic  
- `Recoil → todoAtom` → Global state  
- `useLocalStorage()` → Permanent save  
- Tailwind UI  

#### Todo Features:
- Add Task  
- Edit Task  
- Delete Task  
- Mark Complete  
- Persist tasks even after refresh  
- Smooth & clean UI  

---

### 🌗 **4. Theme Switcher (Light/Dark)**  
Using:
- Recoil → `themeAtom`  
- Custom hook: `useTheme()`  
- Saves theme in LocalStorage  
- Applies global dark/light styles  

---

### 👤 **5. Profile Management**
Inside Dashboard → Settings:
- View Profile  
- Edit Profile  
- Upload Profile Image (FormData)  
- Profile context handled through Recoil  

---

### 📂 **6. Dashboard Navigation**
Sidebar navigation:
- My Day (Todo App)
- Important
- Planned
- Tasks
- Products Page
- Registration Wizard
- Profile Settings

---

## 🛠️ **Tech Stack**

### Frontend:
- **React (Vite)**
- **Recoil** (state management)
- **Formik + Yup** (form handling & validation)
- **Tailwind CSS**
- **React Router**
- **Custom Hooks**

---

## 📁 **Project Structure**


