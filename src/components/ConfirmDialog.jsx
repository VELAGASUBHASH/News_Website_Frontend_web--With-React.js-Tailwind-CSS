import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({ title = "Are you sure?", message, onConfirm, onCancel, loading }) => {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} fullWidth={false}>
          Cancel
        </Button>
        <Button onClick={onConfirm} loading={loading} fullWidth={false}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;