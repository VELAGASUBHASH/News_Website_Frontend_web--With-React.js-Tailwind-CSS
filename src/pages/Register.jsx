import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateRegisterForm } from "../utils/validators";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import MainLayout from "../layouts/MainLayout";

const Register = () => {
  const { register, actionLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearError();

    const errors = validateRegisterForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Backend expects "confirmpassword"
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      confirmpassword: form.confirmPassword,
    };

    console.log("Register Payload:", payload);

    const result = await register(payload);

    if (result?.success) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join Amaravati Times for premium local coverage
        </p>

        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={fieldErrors.name}
            placeholder="Enter your full name"
            autoComplete="name"
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={fieldErrors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
            placeholder="Enter password"
            autoComplete="new-password"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            placeholder="Confirm password"
            autoComplete="new-password"
          />

          <Button
            type="submit"
            loading={actionLoading}
            className="w-full mt-4"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Register;