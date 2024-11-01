import { useState } from "react";

const InputBox = ({ initialValue, onSave, onCancel }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSave(value);
          setValue("");
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          onCancel();
          setValue("");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export { InputBox };