import React, { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export function AuthField({
  label,
  icon,
  type,
  placeholder,
  focused,
  onFocus,
  onBlur,
  id, // Tetap ambil id jika dikirim manual
  ...props // Tangkap sisa props dari register() (name, onChange, ref, dll)
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} style={{ /* ... style Anda ... */ }}>
        {label}
      </label>
      <div style={{ /* ... style container ... */ }}>
        <span className="material-symbols-outlined" style={{ /* ... style icon ... */ }}>
          {icon}
        </span>
        <input
          {...props} // Ini yang menyuntikkan register("name")
          id={id}
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ /* ... style input ... */ }}
        />
      </div>
    </div>
  );
}