import "./Error.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Error = ({ message, isErrorVisable, closeError }: any) => {
  if (isErrorVisable) {
    return (
      <div className="error-card">
        <div className="error-header">
          <h3>Error</h3>
          <i className="bi bi-x-circle" onClick={closeError}></i>
        </div>
        <p>{message}</p>
      </div>
    );
  }
};

export default Error;
