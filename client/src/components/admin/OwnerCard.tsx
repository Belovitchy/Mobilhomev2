import type { TypeOwner } from "../../types/TypeFiles";
import EditBtn from "../ui/EditBtn";
import DeleteBtn from "../ui/DeleteBtn";
import { useState } from "react";
import PopDeleteOwner from "./popDeleteOwner";

function OwnerCard({
  ownerMap,
  setAllOwners,
}: {
  ownerMap: TypeOwner;
  setAllOwners: React.Dispatch<React.SetStateAction<TypeOwner[]>>;
}) {
  const [popModifOwner, setPopModifOwner] = useState(false);
  const [popDeleteOwner, setPopDeleteOwner] = useState(false);

  function handleModifOwner() {
    setPopModifOwner(true);
  }

  function handleDeleteOwner() {
    setPopDeleteOwner(true);
  }

  return (
    <>
      {popModifOwner ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <button
            className="bg-amber-700 hover:cursor-pointer"
            type="button"
            onClick={() => setPopModifOwner(false)}
          >
            a suivre clic retour
          </button>
        </div>
      ) : null}

      {popDeleteOwner ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopDeleteOwner
            setAllOwners={setAllOwners}
            id={ownerMap.id}
            ownerMap={ownerMap}
            onClose={() => setPopDeleteOwner(false)}
          />
        </div>
      ) : null}
      <article
        key={ownerMap.id}
        className="relative bg-(--color-cards) rounded-lg p-4 shadow-md min-w-80 min-h-40 flex flex-col justify-between"
      >
        <div className="flex flex-row justify-between">
          <h1>{ownerMap.name}</h1>
          <div className="flex flex-row gap-2">
            <EditBtn onClick={() => handleModifOwner()} />
            <DeleteBtn onClick={() => handleDeleteOwner()} />
          </div>
        </div>

        <h2>{ownerMap.email}</h2>
        <h2>{ownerMap.isAdmin ? "Administrateur" : "Propriétaire"}</h2>
      </article>
    </>
  );
}

export default OwnerCard;
