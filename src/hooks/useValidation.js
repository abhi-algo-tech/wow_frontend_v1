// src/hooks/useValidation.js
import { useState } from "react";
import { Form } from "antd";

const useValidation = (initialValues, validationRules) => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (rule) {
      if (rule.required && !value) {
        return rule.message || "This field is required";
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message || "Invalid field";
      }
    }
    return null;
  };

  const validateForm = (values) => {
    const newErrors = {};
    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (onSubmit) => {
    setIsSubmitting(true);
    form.validateFields().then((values) => {
      if (validateForm(values)) {
        onSubmit(values);
      }
      setIsSubmitting(false);
    });
  };

  return {
    form,
    errors,
    isSubmitting,
    handleSubmit,
  };
};

export default useValidation;
