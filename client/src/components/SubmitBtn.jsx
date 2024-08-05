import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div className="form-control">
      <label></label>
      <button
        type="submit"
        className="btn btn-primary block"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>Sending
          </>
        ) : (
          text || 'Submit'
        )}
      </button>
    </div>
  )
}
export default SubmitBtn
