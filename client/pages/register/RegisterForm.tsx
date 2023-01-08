import "yup-phone";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import MyForm from "../../components/formik/MyForm";
import MyInput from "../../components/formik/MyInput";
import Link from "next/link";

//extending Yup
YupPassword(Yup);

const customValidation = ({ phoneNo }: { phoneNo: string }) => {
  const phoneSchema = Yup.string().phone().required();

  const errors: { phoneNo?: string } = {};
  if (!phoneNo) {
    errors.phoneNo = "Required";
  } else if (!phoneSchema.isValidSync(phoneNo)) {
    errors.phoneNo = "Invalid Phone Number";
  }
  return errors;
};

export function RegisterForm() {
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        dialCode: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
        role: "PATIENT",
        isDoctor: false,
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .min(5, "Must be 5 characters or more")
          .max(40, "Must be 40 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().password().required("Required"),
        confirmPassword: Yup.string()
          .test("password-match", "Password Mismatch", function (value) {
            return this.parent.password === value;
          })
          .required("Required"),
      })}
      validate={customValidation}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <MyForm>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tighter text-zinc-600">
            START FOR FREE
          </h3>
          <h1 className="text-3xl font-bold tracking-tight after:text-4xl after:font-black after:text-sky-600 after:content-['.']">
            Create new account
          </h1>
          <h4 className="text-sm font-semibold tracking-tighter text-zinc-600">
            Already A Member?{" "}
            <Link href="/login" className="text-sky-600">
              Log In
            </Link>
          </h4>
        </div>
        <div className="flex flex-col gap-3">
          <MyInput
            label="Full Name"
            name="fullName"
            type="fullName"
            placeholder="Muhammad Mughees Raza"
          />

          <MyInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="mughees@eclinic.com"
          />
        </div>
        <MyInput
          label="Phone"
          name="phoneNo"
          type="tel"
          placeholder="123-1234567"
        />

        <MyInput label="Password" name="password" type="password" />

        <MyInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <button type="submit">Submit</button>
      </MyForm>
    </Formik>
  );
}
