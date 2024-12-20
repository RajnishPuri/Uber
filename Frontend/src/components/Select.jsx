const Select = ({ icon: Icon, options, ...props }) => {
    return (
        <div className='relative mb-3 w-3/4'>
            {Icon && (
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <Icon className='size-5 text-green-500' />
                </div>
            )}
            <select
                {...props}
                className={`w-full pl-${Icon ? '10' : '3'} pr-3 py-2 bg-[#eeeeee] bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-black transition duration-200`}
            >
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option.value}
                        disabled={index === 0}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
