import type { TypeReservation } from "../../types/TypeFiles";
import PopCard from "../ui/PopCard";
import WarningValidBtn from "../ui/warningValidBtn";
import UndoBtn from "../ui/undoBtn";

function PopDeleteResa({
  resaToDelete,
  onClose,
  confirmDeleteResa,
}: {
  resaToDelete: TypeReservation;
  onClose: () => void;
  confirmDeleteResa: () => void;
}) {
  return (
    <PopCard
      title={`Supprimer la réservation ${resaToDelete.name} ?`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <WarningValidBtn type="button" onValid={confirmDeleteResa} />
        <UndoBtn onClose={onClose} />
      </div>
    </PopCard>
  );
}

export default PopDeleteResa;
