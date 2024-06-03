import ReactDOM from "react-dom";

const ModalOverlay = ({ children, onClick }) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-Geist text-white backdrop-blur-lg"
    >
      {children}
    </div>,
    document.body,
  );
};

export default ModalOverlay;
