import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const TABS = { INFO: "info", PASSWORD: "password" };

const Profile = () => {
  const { user, updateProfile, changeUserPassword, actionLoading } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS.INFO);

  // Profile info form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileMessage, setProfileMessage] = useState(null);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState(null);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    const errors = {};
    if (!profileForm.name.trim()) errors.name = "Name is required";
    if (!profileForm.email.trim()) errors.email = "Email is required";
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await updateProfile(profileForm);
    if (result.success) {
      setProfileMessage({ type: "success", text: "Profile updated successfully." });
    } else {
      setProfileMessage({ type: "error", text: result.message });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = "Current password is required";
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters";
    if (passwordForm.confirmNewPassword !== passwordForm.newPassword)
      errors.confirmNewPassword = "Passwords do not match";
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await changeUserPassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    if (result.success) {
      setPasswordMessage({ type: "success", text: "Password changed successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } else {
      setPasswordMessage({ type: "error", text: result.message });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold font-serif mb-2">My Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Manage your account details and security settings.
        </p>

        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab(TABS.INFO)}
            className={`pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === TABS.INFO
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-ink"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab(TABS.PASSWORD)}
            className={`pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === TABS.PASSWORD
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-ink"
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === TABS.INFO && (
          <form onSubmit={handleProfileSubmit} noValidate>
            {profileMessage && (
              <div
                className={`mb-4 px-3 py-2 text-sm rounded-md border ${
                  profileMessage.type === "success"
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-red-50 border-primary text-primary"
                }`}
              >
                {profileMessage.text}
              </div>
            )}
            <FormInput
              label="Full Name"
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              error={profileErrors.name}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              error={profileErrors.email}
            />
            {user?.role && (
              <p className="text-xs text-gray-400 mb-4">
                Role: <span className="font-medium capitalize">{user.role}</span>
              </p>
            )}
            <Button type="submit" loading={actionLoading} fullWidth={false}>
              Save Changes
            </Button>
          </form>
        )}

        {activeTab === TABS.PASSWORD && (
          <form onSubmit={handlePasswordSubmit} noValidate>
            {passwordMessage && (
              <div
                className={`mb-4 px-3 py-2 text-sm rounded-md border ${
                  passwordMessage.type === "success"
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-red-50 border-primary text-primary"
                }`}
              >
                {passwordMessage.text}
              </div>
            )}
            <FormInput
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              error={passwordErrors.currentPassword}
              autoComplete="current-password"
            />
            <FormInput
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              error={passwordErrors.newPassword}
              autoComplete="new-password"
            />
            <FormInput
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              error={passwordErrors.confirmNewPassword}
              autoComplete="new-password"
            />
            <Button type="submit" loading={actionLoading} fullWidth={false}>
              Update Password
            </Button>
          </form>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;