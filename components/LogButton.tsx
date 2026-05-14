type LogButtonProps = {
  onClick: () => void;
  label: string;
};

function LogButton({ onClick, label }: LogButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

export default LogButton;