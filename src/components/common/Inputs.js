const Inputs = ({ formik, name, label, type = "text" }) => {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...formik.getFieldProps(name)} // this get field prop thingy is going to pass the onblur onchange etc
        name={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Inputs;
