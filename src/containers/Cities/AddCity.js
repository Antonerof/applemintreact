import React from "react";
import {Field, Form} from "react-final-form";

const required = value => (value ? undefined : "Required");

const minLength = min => value =>
    value.length >= min ? undefined : `Should be longer than ${min} chars`;

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);


class AddCity extends React.Component {

    onSubmit = (values) => {
        this.props.addCity(values)
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="col-6">

                            <Field name="name" validate={required}>
                                {({input, meta}) => (
                                    <div className="md-form form-sm">
                                        <input {...input}
                                               type="text"
                                               className="form-control form-control-sm"
                                               placeholder="City Name"
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="region" validate={composeValidators(required, minLength(3))}>
                                {({input, meta}) => (
                                    <div className="md-form form-sm">
                                        <input
                                            {...input}
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="City Region"/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <div className="buttons">
                                <button className="btn btn-primary waves-effect waves-light btn-sm" type="submit">
                                    Add city
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            />
        )
    }

}


export default AddCity;