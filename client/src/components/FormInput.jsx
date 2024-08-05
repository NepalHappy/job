import SubmitBtn from './SubmitBtn'

const FormInput = ({ type, label, defaultValue, name, onChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="capitalize">{label || name}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ''}
        className="input input-bordered w-full max-w-xs"
        onChange={onChange}
      />
    </div>
  )
}
export default FormInput
