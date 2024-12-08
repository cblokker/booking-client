import React from 'react';

export default function ModalActions({
  onCancel,
  onSubmit,
  submitLabel = 'Complete Session',
  cancelLabel = 'Cancel'
}) {
  return (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        {cancelLabel}
      </button>
      {onSubmit && (
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
