import type { TypeMobilhome } from "../../types/TypeFiles";
import { deleteMobilhomeOwner } from "../../services/mobilhomeService";
import PopCard from "../ui/PopCard";
import UndoBtn from "../ui/undoBtn";
import WarningValidBtn from "../ui/warningValidBtn";

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
    <PopCard title={`Supprimer ${mobilhome.name} ?`} onClose={() => onClose()}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => postdeleteMobilhome(e)}
      >
        <WarningValidBtn type="submit" />
        <UndoBtn
          onClose={() => {
            onClose();
          }}
        />
      </form>
    </PopCard>
  );
}

export default PopDeleteMobilhome;
