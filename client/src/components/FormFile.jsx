const FormFile = ({ name, label }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="capitalize">{label || name}</span>
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="input input-bordered"
      />
    </div>
  )
}
export default FormFile
