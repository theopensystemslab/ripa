import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React from "react";
import FocusWithin from "react-focus-within";
import Messages from "../shared/components/submit-messages";
import Question from "./Question";
export const StreetAddress = ({ title, type, options, includeLookup = false }) => {
    const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = React.useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(true);
    const formik = useFormik({
        initialValues: {},
        validate: values => {
            if (values["building"] &&
                values["building"] !== "" &&
                values["street"] &&
                values["street"] !== "" &&
                values["city"] &&
                values["city"] !== "") {
                setErrorMessageVisible(false);
                setSubmitButtonDisabled(false);
            }
            else {
                setErrorMessageVisible(true);
                setSubmitButtonDisabled(true);
            }
        },
        onSubmit: (values, { resetForm }) => {
            console.log(JSON.stringify(values, null, 2));
            setSuccessMessageVisible(true);
            setTimeout(() => {
                resetForm();
                setSuccessMessageVisible(false);
                setSubmitButtonDisabled(true);
            }, 1000);
        }
    });
    const renderLabels = el => {
        switch (el) {
            case "building":
                return "Building and street";
            case "street":
                return "";
            case "city":
                return "Town or City";
            case "country":
            case "postcode":
                return el;
            default:
                break;
        }
    };
    return (React.createElement(FocusWithin, null, ({ isFocused, getFocusProps }) => (React.createElement("div", Object.assign({}, getFocusProps()),
        React.createElement(Box, { py: 4, maxWidth: 480 },
            React.createElement("form", { "data-testid": "streetAddressForm", onSubmit: formik.handleSubmit },
                React.createElement(Box, { mb: 1.5 },
                    React.createElement(Question, { inFocus: isFocused },
                        React.createElement("strong", null, title))),
                options.map((el, index) => (React.createElement("div", { key: `${el}-${index}` },
                    React.createElement(Box, { mb: 2.5 },
                        React.createElement(TextField, { onChange: formik.handleChange, placeholder: el, label: renderLabels(el), fullWidth: true, value: formik.values[el] || "", type: type, name: el }))))),
                React.createElement(Box, { textAlign: "right" },
                    React.createElement("div", null, errorMessageVisible && formik.touched ? (React.createElement(Messages, { type: "error", message: "Please Fill the Building, Street and Town fields" })) : null),
                    includeLookup && (React.createElement(Button, { type: "submit", disabled: submitButtonDisabled, variant: "contained", color: "primary" }, "Look up address")),
                    React.createElement("div", null, successMessageVisible ? (React.createElement(Messages, { type: "success", message: "Form submitted successfully" })) : null))))))));
};
export default StreetAddress;
