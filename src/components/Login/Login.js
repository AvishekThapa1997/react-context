import React, { useState, useEffect, useReducer, useContext ,useRef } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../common/Input";
//let count = 0;
const defaulInputFieldState = {
  value: "",
  isValid: undefined,
};
const emailReducer = (state, action) => {
  if (action.type === "user-input") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }
  if (action.type === "input-blur") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return defaulInputFieldState;
};

const passwordReducer = (prevState, action) => {
  if (action.type === "input-password") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6,
    };
  }
  if (action.type === "input-password-blur") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
  return defaulInputFieldState;
};
const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispatch] = useReducer(
    emailReducer,
    defaulInputFieldState
  );
  const [passwordState, passwordDispatch] = useReducer(
    passwordReducer,
    defaulInputFieldState
  );
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [emailState.isValid, passwordState.isValid]);
  const cxt = useContext(AuthContext);
  const emailRef = useRef();
  const passRef = useRef();
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({
      type: "user-input",
      value: event.target.value,
    });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    passwordDispatch({
      type: "input-password",
      value: event.target.value,
    });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    emailDispatch({
      type: "input-blur",
    });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({
      type: "input-password-blur",
    });
    // setPasswordIsValid(passwordState.isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      cxt.loginHandler(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailRef.current.focus();
    } else {
      passRef.current.focus();
    }
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          ref={emailRef}
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
          isValid={emailState.isValid}
        >
          E-mail
        </Input>
        <Input
          ref = {passRef}
          type="password"
          id="password"
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
          isValid={passwordState.isValid}
        >
          password
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
