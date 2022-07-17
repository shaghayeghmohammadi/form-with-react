import React from "react";
const RadioButton = ({ formik, name, radioOptions }) => {
  return (
    <div className="formControl checkbox">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <label htmlFor={item.value}>{item.label}</label>
          <input
            type="radio"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
        </React.Fragment>
      ))}

      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default RadioButton;
