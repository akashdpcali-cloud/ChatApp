import "./ErrorPopup.css";

function ErrorPopup({ message, onClose }) {

    if (!message) return null;

    return (
        <div className="error-popup-overlay">

            <div className="error-popup">

                <div className="error-message">
                    {message}
                </div>

                <button
                    className="error-okay-button"
                    onClick={onClose}
                >
                    Okay
                </button>

            </div>

        </div>
    );
}

export default ErrorPopup;