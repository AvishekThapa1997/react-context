import React, { useState, useEffect, useReducer,useContext} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
//let count = 0;
const defaulInputFieldState = {
  value: "",
  isValid: undefined,
};
const emailReducer = (state, action) => {
  if (action.type === 'user-input') {
    return {
      value: action.value,
      isValid: action.value.includes("@")
    }
  }
  if (action.type === 'input-blur') {
    return {
      value: state.value,
      isValid: state.value.includes("@")
    }
  }
  return defaulInputFieldState;
};

const passwordReducer = (prevState, action) => {
  if (action.type === 'input-password') {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6
    }
  }
  if (action.type === 'input-password-blur') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6
    }
  }
  return defaulInputFieldState;
}
const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispatch] = useReducer(emailReducer, defaulInputFieldState);
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, defaulInputFieldState);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);
    return () => {
      clearTimeout(timeOut);
    }
  }, [emailState.isValid, passwordState.isValid]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({
      type: 'user-input',
      value: event.target.value,
    });
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    passwordDispatch({
      type: 'input-password',
      value: event.target.value,
    })
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    emailDispatch({
      type: 'input-blur'
    })
  };

  const validatePasswordHandler = () => {
    passwordDispatch({
      type: 'input-password-blur'
    })
    // setPasswordIsValid(passwordState.isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    cxt.loginHandler(emailState.value, passwordState.value);
  };
  const cxt = useContext(AuthContext)
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
