import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const initialValues = {
  name: "",
  gender: "",
  email: "",
  password: "",
  number: "",
  passwordConfirmation: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("اسمتو باید حتما بنویسی داداش!")
    .min(6, "اسم و فامیلت چقد کوتاهه"),
  gender: yup.string().required("جنسیتتو وارد کن!"),
  email: yup
    .string()
    .email("مطمئنی ایمیلت معتبره؟")
    .required("پس ایمیلت کو؟ حتما باید بنویسیش!"),
  number: yup
    .string()
    .required("شمارتو باید بزنی")
    .matches(/^[0-9]{11}$/, "شماره نامعتبر"),
  password: yup
    .string()
    .required("پسورد نزاشتی که نابغه! :)")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "پسوردت باید حداقل 8 کاراکتر، به لاتین باشه، حداقل 1 حرف و 1 عدد هم داشته باشه."
    ),
  passwordConfirmation: yup
    .string()
    .required("ضروری")
    .oneOf([yup.ref("password"), null], "پسوردها یکی نیستن!"),
});

const SignUpForm = () => {
  const [signUp, setSignUp] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  // onclick for my button
  const handleClick = () => {
    setSignUp(true);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label htmlFor="">نام و نام‌خانوادگی</label>
          <input
            type="text"
            // this get field prop thingy is going to pass the onblur onchange etc
            {...formik.getFieldProps("name")}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl checkbox">
          <label htmlFor="0">خانوم</label>
          <input
            type="radio"
            name="gender"
            id="0"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="1">آقا</label>
          <input
            type="radio"
            name="gender"
            id="1"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
        </div>
        <div className="formControl">
          <label htmlFor="">ایمیل</label>
          <input type="text" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="">شماره تماس</label>
          <input
            type="text"
            {...formik.getFieldProps("number")}
            name="number"
          />
          {formik.errors.number && formik.touched.number && (
            <div className="error">{formik.errors.number}</div>
          )}
        </div>

        <div className="formControl">
          <label htmlFor="">رمزعبور</label>
          <input
            type="text"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="">تکرار رمزعبور</label>
          <input
            type="text"
            {...formik.getFieldProps("passwordConfirmation")}
            name="passwordConfirmation"
          />
          {formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation && (
              <div className="error">{formik.errors.passwordConfirmation}</div>
            )}
        </div>
        <button
          onClick={handleClick}
          className={formik.isValid ? "button" : "button disabled"}
          type="submit"
        >
          ثبت‌نام
        </button>
        {signUp ? (
          <div className="success">تبریک! ثبت‌نام با موفقیت انجام شد.</div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
