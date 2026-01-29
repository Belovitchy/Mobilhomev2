function UndoBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      className="border-(--color-primary) border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-(--color-primary) hover:text-(--color-cards) transition-colors duration-300"
      type="button"
      onClick={() => onClose()}
    >
      Annuler
    </button>
  );
}

export default UndoBtn;
