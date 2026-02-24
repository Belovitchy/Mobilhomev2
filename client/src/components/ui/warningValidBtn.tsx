function WarningValidBtn({
  type,
  onValid,
}: {
  type: "button" | "submit";
  onValid: () => void;
}) {
  return (
    <button
      className="border-(--color-secondary) text-(--color-secondary) border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-(--color-secondary) hover:text-(--color-cards) transition-colors duration-300"
      type={type}
      onClick={() => onValid()}
    >
      Valider
    </button>
  );
}

export default WarningValidBtn;
