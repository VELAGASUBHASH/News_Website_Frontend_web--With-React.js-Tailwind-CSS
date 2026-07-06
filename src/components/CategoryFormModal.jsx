import { useState } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
import Button from "./Button";

const CategoryFormModal = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({ name: initialData?.name || "" });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    setError(null);
    const success = await onSave(form);
    setSaving(false);
    if (!success) setError("Could not save category.");
  };

  return (
    <Modal title={initialData ? "Edit Category" : "New Category"} onClose={onClose} maxWidth="max-w-sm">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-sm text-primary mb-3">{error}</p>}
        <FormInput
          label="Category Name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          placeholder="e.g. Amaravati Capital"
        />
        <Button type="submit" loading={saving} fullWidth={false}>
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;