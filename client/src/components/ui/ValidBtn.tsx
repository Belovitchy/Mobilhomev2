function ValidBtn({ type }: { type: "button" | "submit" }) {
  return (
    <button
      type={type}
      className="w-40 mx-auto bg-(--color-cards) text-(--color-primary) border-2 border-(--color-primary) px-4 py-2 rounded-full hover:bg-(--color-primary) hover:text-(--color-cards) transition-colors duration-300 my-8 hover:cursor-pointer"
    >
      Valider
    </button>
  );
}

export default ValidBtn;
