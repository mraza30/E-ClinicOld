import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

export default function Register() {
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phoneNo: "",
        password: "",
        role: "PATIENT",
        isDoctor: false,
        acceptedTerms: false,
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(5, "Must be 5 characters or more")
          .max(40, "Must be 40 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phoneNo: Yup.string().required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={({ isDoctor, ...rest }, { setSubmitting }) => {
        if (isDoctor) rest.role = "DOCTOR";
        setTimeout(() => {
          alert(JSON.stringify({ rest }, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ getFieldProps, handleSubmit, touched, errors }) => (
        <Stack
          component="form"
          maxWidth="20rem"
          spacing={2}
          margin="auto"
          onSubmit={handleSubmit}
        >
          <TextField
            error={touched.fullName && errors.fullName ? true : false}
            id="fullName"
            type="text"
            label="Full Name"
            size="small"
            variant="filled"
            required
            {...getFieldProps("fullName")}
          />

          <TextField
            error={touched.email && errors.email ? true : false}
            id="email"
            type="email"
            label="Email"
            size="small"
            variant="filled"
            required
            {...getFieldProps("email")}
          />

          <TextField
            error={touched.phoneNo && errors.phoneNo ? true : false}
            id="phoneNo"
            type="tel"
            label="Phone"
            size="small"
            variant="filled"
            required
            {...getFieldProps("phoneNo")}
          />

          <TextField
            error={touched.password && errors.password ? true : false}
            id="password"
            type="password"
            label="Password"
            size="small"
            variant="filled"
            required
            {...getFieldProps("password")}
          />

          <FormControlLabel
            control={<Checkbox {...getFieldProps("isDoctor")} size="medium" />}
            label="SignUp As Doctor"
          />

          <FormControlLabel
            control={<Checkbox {...getFieldProps("isDoctor")} size="medium" />}
            label="SignUp As Doctor"
          />

          <Button type="submit" variant="contained" color="secondary">
            Create Personal Account
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
