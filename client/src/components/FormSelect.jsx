const FormSelect = ({ list, name, label, defaultValue, onChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="capitalize">{label || name}</span>
      </label>
      <select
        name={name}
        id={name}
        className="select  select-bordered w-full max-w-xs"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default FormSelect
