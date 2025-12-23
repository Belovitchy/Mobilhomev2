import { useEffect, useState } from "react";
import { ImExit } from "react-icons/im";
import type { TypeManager } from "../types/TypeFiles";

function PopAddMobilhome({
  id,
  onClose,
}: { id: number | undefined; onClose: () => void }) {
  const [ownerManagers, setOwnerManagers] = useState<TypeManager[]>([]);
  useEffect(() => {
    //fetch all manager for id (owner_id) and display to select
    fetch(`${import.meta.env.VITE_API_URL}/api/manager/owner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("mes managers:", data);
        setOwnerManagers(data);
      });
  }, [id]);

  async function postAddMobilhome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mobilhomeName = formData.get("mobilhomeName") as string;
    const icalLink = formData.get("icalLink") as string;
    const managerId = formData.get("managerId") as string;
    console.log(
      "name:",
      mobilhomeName,
      "icalLink:",
      icalLink,
      "managerId:",
      managerId,
    );
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/mobilhome/owner/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          mobilhomeName: mobilhomeName,
          icalLink: icalLink,
          managerId: Number(managerId),
        }),
      },
    );
    if (response.ok) {
      onClose();
    }
  }

  return (
    <form
      onSubmit={(e) => postAddMobilhome(e)}
      className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[340px] bg-[var(--color-cards)]  mx-auto  border-2 border-[var(--color-primary)] rounded-2xl flex flex-col gap-4 p-4 "
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
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
        type="text"
        name="mobilhomeName"
        id="mobilhomeName"
        required
      />
      <label htmlFor="icalLink">Lien ical:</label>
      <input
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
        type="text"
        name="icalLink"
        id="icalLink"
      />
      <label htmlFor="managerName">Gérant:</label>
      <select
        className="bg-[var(--color-background)] w-full p-2 rounded-lg mx-auto"
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
        className="w-40 mx-auto bg-[var(--color-cards)] text-[var(--color-primary)] border-2 border-[var(--color-primary)] px-4 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-cards)] transition-colors duration-300 my-8 hover:cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PopAddMobilhome;
