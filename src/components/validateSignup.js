export default function validateSignup(values) {
  let errors = {};
  let errorsFlag = {};

  if (!values.username.trim()) {
    errors.username = "UserName required";
    errorsFlag.Username = true;
  }

  if (!values.name.trim()) {
    errors.name = "Name required";
    errorsFlag.name = true;
  }

  //Email
  if (!values.email) {
    errors.email = "Email required";
    errorsFlag.Email = true;
  } else if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      values.email
    )
  ) {
    errors.email = "Email address is invalid";
    errorsFlag.Email = true;
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone Number required";
    errorsFlag.Phone = true;
  }
  else if(values.phone.length<10){
    errors.phone = "Invalid phone number";
    errorsFlag.Phone = true;
  }

  if (!values.password) {
    errors.password = "Password required";
    errorsFlag.Password1 = true;
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long";
    errorsFlag.Password1 = true;
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
      values.password
    )
  ) {
    errorsFlag.Password1 = true;
    errors.password =
      "Password must contain - at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  }

  return { errors, errorsFlag };
}
