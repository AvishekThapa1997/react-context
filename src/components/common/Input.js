import styles from "./Input.module.css";
import { forwardRef } from "react";
const Input = forwardRef((props,ref) => {
  return (
    <div
      className={`${styles.control} ${props.isValid === false ? styles.invalid : ""
        }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
      />
    </div>
  );
});
export default Input;
