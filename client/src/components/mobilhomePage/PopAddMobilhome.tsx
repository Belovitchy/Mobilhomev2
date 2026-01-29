import { useEffect, useState } from "react";
import { ImExit } from "react-icons/im";
import type { TypeManager, TypeMobilhome } from "../../types/TypeFiles";
import {
  getManagersByOwner,
  addMobilhomeOwner,
} from "../../services/mobilhomeService";

function PopAddMobilhome({
  id,
  onClose,
  setOwnerMobilhome,
}: {
  id: number;
  onClose: () => void;
  setOwnerMobilhome: React.Dispatch<React.SetStateAction<TypeMobilhome[]>>;
}) {
  const [ownerManagers, setOwnerManagers] = useState<TypeManager[]>([]);
  useEffect(() => {
    if (!id) return;
    //axios all manager for id (owner_id) and display to select
    const axiosManagersByOwner = async () => {
      const data = await getManagersByOwner(id);
      console.log("mes managers:", data);
      setOwnerManagers(data);
    };
    axiosManagersByOwner();
  }, [id]);

  async function postAddMobilhome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const mobilhomeName = formData.get("mobilhomeName") as string;

    const managerIdRaw = formData.get("managerId") as string;
    const icalLinkRaw = formData.get("icalLink") as string | null;

    const newMobilhome = await addMobilhomeOwner(id, {
      name: mobilhomeName,
      managerId: Number(managerIdRaw),
      icalLink: icalLinkRaw?.trim() || null,
    });
    setOwnerMobilhome((prev) => [...prev, newMobilhome]);

    onClose();
  }

  return (
    <form
      onSubmit={(e) => postAddMobilhome(e)}
      className="absolute top-6 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto  border-2 border-(--color-primary) rounded-2xl flex flex-col gap-4 p-4 "
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto flex items-center mb-4">
          Ajouter mobilhome
        </h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <label htmlFor="mobilhomeName">Nom:</label>
      <input
        className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
        type="text"
        name="mobilhomeName"
        id="mobilhomeName"
        required
      />
      <label htmlFor="icalLink">Lien ical:</label>
      <input
        className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
        type="text"
        name="icalLink"
        id="icalLink"
      />
      <label htmlFor="managerName">Gérant:</label>
      <select
        className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
        name="managerId"
        id="managerId"
        required
      >
        <option value="">--choisir un gérant--</option>
        {ownerManagers.map((manager) => (
          <option key={manager.id} value={manager.id}>
            {manager.name} {manager.firstname}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-40 mx-auto bg-(--color-cards) text-(--color-primary) border-2 border-(--color-primary) px-4 py-2 rounded-full hover:bg-(--color-primary) hover:text-(--color-cards) transition-colors duration-300 my-8 hover:cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PopAddMobilhome;
