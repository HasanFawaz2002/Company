import "./tooltip.css"

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        {text}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
