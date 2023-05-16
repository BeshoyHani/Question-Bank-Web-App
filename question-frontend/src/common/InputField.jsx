export default function InputField({ id, name, label, type, placeholder, value, onChange }) {
    return (
        <div className='input-container'>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} />

        </div>
    );
}