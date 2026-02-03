import type { TypeOwner } from "../../types/TypeFiles";
import PopCard from "../ui/PopCard";
import UndoBtn from "../ui/undoBtn";
import WarningValidBtn from "../ui/warningValidBtn";
import { deleteOwner } from "../../services/adminService";
import { useOwner } from "../../context/ownerContext";

function PopDeleteOwner({
  id,
  ownerMap,
  onClose,
  setAllOwners,
}: {
  id: number;
  ownerMap: TypeOwner;
  onClose: () => void;
  setAllOwners: React.Dispatch<React.SetStateAction<TypeOwner[]>>;
}) {
  const { isAdmin, owner } = useOwner();

  async function postDeleteOwner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!owner?.isAdmin || !isAdmin) {
      onClose();
      return;
    }
    await deleteOwner(owner.id, id);
    setAllOwners((prevOwners) =>
      prevOwners.filter((owner) => owner.id !== ownerMap.id),
    );
    onClose();
  }
  return (
    <PopCard title={`Supprimer ${ownerMap.name} ?`} onClose={() => onClose()}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => postDeleteOwner(e)}
      >
        <WarningValidBtn type="submit" />
        <UndoBtn onClose={() => onClose()} />
      </form>
    </PopCard>
  );
}

export default PopDeleteOwner;
