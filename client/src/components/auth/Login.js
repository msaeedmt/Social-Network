import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { loginUser } from '../../actions/authActions'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.auth.isAuthenticated) {
            console.log("login shodi")
            this.props.history.push('/dashboard');
        }

        if (nextProp.errors) {
            this.setState({ errors: nextProp.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: [e.target.value] });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email[0],
            password: this.state.password[0],
        }

        this.props.loginUser(userData);
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email" className={classnames("form-control form-control-lg",
                                        { 'is-invalid': errors.email })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg",
                                        { 'is-invalid': errors.password })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToPropbs = state => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToPropbs, { loginUser })(Login);
