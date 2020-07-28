import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = { email: "", password: "" };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ email: "", password: "" });
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        required={true}
                        handleChange={this.handleChange}
                        label="email"
                    ></FormInput>
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        required={true}
                        handleChange={this.handleChange}
                        label="password"
                    ></FormInput>
                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton
                            isGoogleSignIn={true}
                            onClick={signInWithGoogle}
                        >
                            {" "}
                            SIGN IN WITH GOOGLE{" "}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;