const TextEntry = ({
  type="text",
  label="",
  labelColor="text-black",
  append="",
  placeholder="",
  name,
  value,
  onChange,
  disabled=false,
  extraClasses=""
}) => {
  return (
    <div className={"grid grid-cols-3 " + extraClasses}>
      {label &&
        <p className={"mr-2 text-right font-semibold self-center "+labelColor}>
          {label}
        </p>
      }
      <input type={type} value={value} name={name} onChange={onChange}
        disabled={disabled} placeholder={placeholder}
        className={
          "rounded my-1 py-1 pl-2 bg-gray-200 w-full opacity-100 disabled:opacity-70 text-black self-end focus:outline-none focus:ring-2 focus:ring-yellow-500 " +
          (( label &&  append) ? "col-span-1" :
           (!label && !append) ? "col-span-3" :
                                 "col-span-2"
          )
        }/>
      {append &&
        (
          (typeof append === 'string' || typeof append === 'number') ?
            <p className="text-gray-800 self-center font-semibold ml-2"> {append} </p> :
            append
        )
      }
    </div>
  )
}

export default TextEntry;
