import * as yup from "yup";


export const registerSchema = yup.object().shape({
     // username: yup.string().required('Username is required'),
 email: yup.string().email().required("Email is required"),
 password: yup.string().min(8, "Password must be atleast 8 characters").required('Password is required')
});


export const editProfileSchema = yup.object().shape({
    // username: yup.string().required('Username is required'),
email: yup.string().email().required("Email is required"),
first_name: yup.string().required("First name is required"),
last_name: yup.string().required("Last name is required")
});



export const loginSchema = yup.object().shape({
    // username: yup.string().required('Username is required'),
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(8, "Password must be atleast 8 characters").required('Password is required')
   });
   