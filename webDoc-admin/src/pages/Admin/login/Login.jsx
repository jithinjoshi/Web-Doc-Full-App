import "./login.scss"
import { useFormik } from 'formik'
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { signInAdmin } from "../../../Helpers/adminHelper";
import { useSelector, useDispatch } from 'react-redux'
import { login, selectAdmin } from "../../../redux/adminSlice";
import { useEffect } from "react";

const validate = values => {
  const errors = {};

  //email
  if (!values.email) {
    errors.email = toast.error("email is required")
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("invalid email address")
  }

  //password
  else if (!values.password) {
    errors.password = toast.error('password is required');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('wrong password');
  }
  return errors

}

const Login = () => {
  const dispatch = useDispatch()
  const history = useNavigate();
  const admin = useSelector(selectAdmin)
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const signin = signInAdmin(values)
      toast.promise(signin, {
        loading: 'searching...',
        success: <b>sign in successfull</b>,
        error: <b>can't find the user</b>
      })

      signin.then((user) => {
        if (user) {
          dispatch(login({
            email:user?.data?.email
          }))


          history('/') 

        }
      }).catch((err) => {
        return err;
      })

    }
  })

  
  return (
    <div className="container">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h1 style={{ textAlign: "center"}}>Admin Login</h1>
      <div className="form">
        <form action="#" className="login-form" onSubmit={formik.handleSubmit}>
          <input type="text" name="email" placeholder="email" onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
          <input type="password" name="password" placeholder="Password" onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login