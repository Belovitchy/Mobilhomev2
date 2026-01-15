import type { TypeMobilhome } from "../../types/TypeFiles";
import { deleteMobilhomeOwner } from "../../services/mobilhomeService";

function PopDeleteMobilhome({
  id,
  mobilhome,
  onClose,
  onDelete,
}: {
  id: number;
  mobilhome: TypeMobilhome;
  onClose: () => void;
  onDelete: (mobilhomeId: number) => void;
}) {
  async function postdeleteMobilhome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await deleteMobilhomeOwner(id, mobilhome.id);
    onDelete(mobilhome.id);
    onClose();
  }

  return (
    <form
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2  w-85 bg-(--color-cards) cards mx-auto p-4 border-2 border-(--color-primary) rounded-2xl flex flex-col gap-8 mt-16"
      onSubmit={(e) => postdeleteMobilhome(e)}
    >
      <h1 className="text-2xl font-bold m-auto">
        Supprimer {mobilhome.name} ?
      </h1>

      <button
        className="border-(--color-secondary) text-(--color-secondary) border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-(--color-secondary) hover:text-(--color-cards) transition-colors duration-300"
        type="submit"
      >
        Valider
      </button>
      <button
        className="border-(--color-primary) border-2 p-2 rounded-full mb-6 w-40 mx-auto hover:bg-(--color-primary) hover:text-(--color-cards) transition-colors duration-300"
        type="button"
        onClick={() => onClose()}
      >
        Annuler
      </button>
    </form>
  );
}

export default PopDeleteMobilhome;
