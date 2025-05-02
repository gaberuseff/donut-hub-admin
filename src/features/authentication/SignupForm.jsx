import {useForm} from "react-hook-form";

import useSignup from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {errors} = formState;

  const {signup, isLoading} = useSignup();

  const onSubmit = ({fullName, email, password}) => {
    signup(
      {fullName, email, password},
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("Signup failed", error);
        },
      }
    );
  };

  const onError = (errors) => {
    // console.log("Form errors", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors.fullName}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {required: "This field is requierd"})}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is requierd",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is not valid",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is requierd",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is requierd",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variations="secondary"
          size="medium"
          type="reset"
          onClick={reset}>
          Cancel
        </Button>
        <Button variations="primary" size="medium" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
