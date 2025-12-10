import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Enter a valid phone number")
    .required("Phone is required"),
  address: Yup.string().max(300, "Address too long"),

  
  work: Yup.string().max(100, "Work title too long"),
  country: Yup.string().max(50, "Country name too long"),
});
