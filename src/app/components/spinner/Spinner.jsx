export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
