import React, {Component} from "react";
import Field from "../common/Field";
import  {withFormik} from "formik"
import * as Yup from "yup";

const fields = {
    sections: [
        [
            {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name *'},
            {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email *'},
            {name: 'phone', elementName: 'input', type: 'tel', placeholder: 'Your Phone *'}
        ],
        [
            {name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Your Phone *'}
        ]
    ]
};

class Contact extends Component {

    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Contact Us</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form name="sentMessage" noValidate="novalidate" onSubmit={this.props.handleSubmit}>
                                <div className="row">
                                    {fields.sections.map((section, sectionIndex) => {
                                        return (
                                            <div className="col-md-6" key={sectionIndex}>
                                                {section.map((field, index) => {
                                                    return <Field {...field}
                                                                  key={index}
                                                                  value={this.props.values[field.name]}
                                                                  name={field.name}
                                                                  onChange={this.props.handleChange}
                                                                  onBlur={this.props.handleBlur}
                                                                  touched={(this.props.touched[field.name])}
                                                                  errors={(this.props.errors[field.name])}
                                                            />
                                                })}
                                            </div>
                                        )
                                    })}
                                    <div className="clearfix"></div>
                                    <div className="col-lg-12 text-center">
                                        <div id="success"></div>
                                        <button id="sendMessageButton"
                                                className="btn btn-primary btn-xl text-uppercase"
                                                type="submit">Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Username should contain atleast 3 characters')
            .required('You must give us your name'),
        email: Yup.string().email('Please Enter a valid email').required('You must enter your email'),
        phone: Yup.string()
            .min(8, 'Phone number is too small')
            .max(15, 'Phone number is too long')
            .required('Please enter your phone number'),
        message: Yup.string().min(20, 'Your message should contain atleast 20 characters')
            .max(1000, 'Your message should not be more than 1000 characters')
            .required('Please enter your message')
    }),
    handleSubmit: (values, {setSubmitting}) => {
        alert("You have submitted the form " + JSON.stringify(values));
    }
})(Contact);