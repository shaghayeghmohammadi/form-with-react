import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Inputs from "./common/Inputs";
import RadioButton from "./common/RadioButton";
import SelectOptions from "./common/SelectOption";
import CheckboxInput from "./common/CheckboxInput";
import axios from "axios";

const radioOptions = [
  { label: "آقا", value: "1" },
  { label: "خانم", value: "0" },
];

const selectOptions = [
  { label: "کشور خود را انتخاب کنید", value: "" },
  { label: "ایران", value: "IR" },
  { label: "آلمان", value: "GER" },
  { label: "اسپانیا", value: "ُSPA" },
  { label: "ترکیه", value: "TURK" },
];

const checkboxOptions = [
  { label: "جاواسکریپت", value: "Javascript" },
  { label: "زبان انگلیسی", value: "English" },
  { label: "بوت‌استرپ", value: "bootstrap" },
  { label: "وردپرس", value: "wordpress" },
  { label: "تیلویند", value: "tailwind" },
];

const initialValues = {
  name: "",
  gender: "",
  email: "",
  password: "",
  number: "",
  passwordConfirmation: "",
  country: "",
  skills: [],
  terms: false,
};

const onSubmit = (values) => {
  axios
    .post("url", values)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("نام و نام‌خانوادگی خود را بنویسید!")
    .min(6, "اسم و فامیل حداقل 6 کاراکتر باشد"),
  gender: yup.string().required("جنسیت خود را وارد کنید!"),
  email: yup.string().email("ایمیل نامعتبر").required("ایمیل ضروری است."),
  number: yup
    .string()
    .required("شماره خود را وارد کنید")
    .matches(/^[0-9]{11}$/, "شماره نامعتبر"),
  country: yup.string().required("لطفا کشور خود را انتخاب کنید"),
  skills: yup
    .array()
    .required("حداقل باید یکی از مهارت‌ها را داشته باشید!")
    .min(1, "حداقل باید یکی از مهارت‌ها را داشته باشید!"),
  password: yup
    .string()
    .required("پسورد نزاشتی که ! :)")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "پسورد باید حداقل 8 کاراکتر، به لاتین، حداقل 1 حرف و 1 عدد داشته باشد."
    ),
  passwordConfirmation: yup
    .string()
    .required("ضروری")
    .oneOf([yup.ref("password"), null], "پسوردها یکسان نیستند!"),
  terms: yup
    .boolean()
    .oneOf([true], "باید با قوانین و مقررات موافق باشید")
    .required("باید با قوانین و مقررات موافق باشید"),
});

const SignUpForm = () => {
  const [signUp, setsignUp] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  // onclick for my button
  const handleClick = () => {
    setsignUp(true);
  };

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Inputs formik={formik} name="name" label="نام و نام‌خانوادگی" />
        <RadioButton
          formik={formik}
          radioOptions={radioOptions}
          name="gender"
        />
        <Inputs formik={formik} name="email" label="ایمیل" />
        <Inputs formik={formik} name="number" label="شماره تماس" />
        <SelectOptions
          name="country"
          formik={formik}
          selectOptions={selectOptions}
        />
        <label className="skills">مهارت‌ها:</label>
        <CheckboxInput
          name="skills"
          formik={formik}
          checkboxOptions={checkboxOptions}
        />
        <Inputs
          formik={formik}
          name="password"
          label="رمزعبور"
          type="password"
        />
        <Inputs
          formik={formik}
          name="passwordConfirmation"
          label="تکرار رمزعبور"
          type="password"
        />

        <div className="formControl checkbox">
          <label htmlFor="terms">با قوانین و مقررات موافقم.</label>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            value={true}
            onChange={formik.handleChange}
            checked={formik.values.terms}
          ></input>
          {formik.errors.terms && formik.touched.terms && (
            <div className="error">{formik.errors.terms}</div>
          )}
        </div>

        <button
          onClick={handleClick}
          className={formik.isValid ? "button" : "button disabled"}
          type="submit"
        >
          ثبت‌نام
        </button>
        {signUp && formik.isValid && (
          <div className="success">تبریک! ثبت‌نام با موفقیت انجام شد.</div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
