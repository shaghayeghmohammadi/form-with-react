import React from "react";
const CheckboxInput = ({ checkboxOptions, formik, name }) => {
  return (
    <div className="options">
      {checkboxOptions.map((item) => (
        <React.Fragment key={item.value}>
          <div className="options-wrapper">
            <label htmlFor={item.value}>{item.label}</label>
            <input
              type="checkbox"
              name={name}
              id={item.value}
              value={item.value}
              onChange={formik.handleChange}
              checked={formik.values[name].includes(item.value)}
            />
          </div>
        </React.Fragment>
      ))}

      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CheckboxInput;
