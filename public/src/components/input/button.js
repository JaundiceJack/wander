import Spinner from '../misc/spinner.js';

const Button = ({ type="button",
  onClick,
  label="",
  textColor="black",
  brightness="400",
  icon,
  loading=false,
  extraClasses=""
}) => {
  return (
    <button type={type}
      onClick={onClick}
      className={
        "mb-3 p-2 font-mont font-semibold rounded text-green-400 " +
        "bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 " +
        "transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none " +
        extraClasses +
        (loading ? " disabled opacity-75 " : "")
      }>
      {loading ?
        <Spinner /> :
        <div className="flex flex-row items-center justify-center">
          <p className={`text-${(textColor === 'white' || textColor === 'black') ? textColor : (textColor + "-" + brightness)}`}>{icon}</p>
          <p className={`text-${(textColor === 'white' || textColor === 'black') ? textColor : (textColor + "-" + brightness)}`}>{label}</p>
        </div>
      }
    </button>
  )
}

export default Button;
