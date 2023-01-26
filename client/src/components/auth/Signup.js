import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

function Signup(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password != password2) props.setAlert("Passwords do not match!", 'danger');
    // try {
    //   const userData = {
    //     username,
    //     email,
    //     password,
    //   };
    //   console.log(userData)
    //   const response = await createUser(userData);
    //   const data = await response.data
    //   if (response.ok) {
    //     console.log(data);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={(e) => handleFormChange(e)}
            value={username}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => handleFormChange(e)}
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleFormChange(e)}
            value={password}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={(e) => handleFormChange(e)}
            value={password2}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Signup)