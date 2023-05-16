export default function InputField({ id, name, label, type, placeholder, value, onChange, className }) {
    return (
        <div className={className ? className : 'input-container'}>
            <label htmlFor={id}>{label}</label>
            <input className={className? '' : "w70 d-block"} type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} />

        </div>
    );
}