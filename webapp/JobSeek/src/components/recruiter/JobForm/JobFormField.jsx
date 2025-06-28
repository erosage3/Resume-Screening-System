const JobFormField = ({ label, name, value, onChange, type = 'text', required = false }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            )}
        </div>
    );
};

export default JobFormField;