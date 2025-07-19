const SimpleInput = ({ 
  label, 
  type = "text", 
  name,
  placeholder = "", 
  value, 
  onChange, 
  required = false
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

export default SimpleInput;
