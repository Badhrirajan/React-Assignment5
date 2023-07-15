import React from 'react'

export default function TextInput({
    type = "",
    id = "",
    placeholder = "",
    value = "",
    onChange = (e) => {},
    disabled = false,
}) {
  return (
    <div>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled = {disabled}
      />
    </div>
  )
}
