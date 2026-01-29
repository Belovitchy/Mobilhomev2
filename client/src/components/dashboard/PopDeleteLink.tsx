import type { TypeLink } from "../../types/TypeFiles";
import { deleteLink } from "../../services/linksService";
import PopCard from "../ui/PopCard";
import UndoBtn from "../ui/undoBtn";
import WarningValidBtn from "../ui/warningValidBtn";
import { useOwner } from "../../context/ownerContext";

function PopDeleteLink({
  id,
  link,
  onClose,
}: {
  id: number;
  link: TypeLink | null;
  onClose: () => void;
}) {
  const { setOwner } = useOwner();

  async function postdeleteLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!link) {
      onClose();
      return;
    }
    await deleteLink(id, link.id);
    setOwner((prevOwner) => {
      if (!prevOwner) return null;
      return {
        ...prevOwner,
        links: prevOwner.links.filter((l) => l.id !== link.id),
      };
    });
    onClose();
  }

  return (
    <PopCard title={`Supprimer ${link?.name} ?`} onClose={() => onClose()}>
      <form className="flex flex-col gap-4" onSubmit={(e) => postdeleteLink(e)}>
        <WarningValidBtn type="submit" />
        <UndoBtn onClose={() => onClose()} />
      </form>
    </PopCard>
  );
}

export default PopDeleteLink;
