import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Formik form submitted:", values);
    alert(`Registration successful! Welcome, ${values.username}!`);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>User Registration (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="span"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;