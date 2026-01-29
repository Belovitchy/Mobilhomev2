import type { TypeMobilhome } from "../../types/TypeFiles";
import ValidBtn from "../ui/ValidBtn";
import { modifMobilhomeOwner } from "../../services/mobilhomeService";
import PopCard from "../ui/PopCard";

function PopModifMobilhome({
  id,
  onClose,
  mobilhome,
  ownerMobilhome,
  onUpdated,
}: {
  id: number;
  onClose: () => void;
  mobilhome: TypeMobilhome;
  ownerMobilhome: TypeMobilhome[];
  onUpdated: (updateMobilhome: TypeMobilhome) => void;
}) {
  const managers = Array.from(
    new Map(
      ownerMobilhome
        .filter((m) => m.manager)
        .map((m) => [m.manager.id, m.manager]),
    ).values(),
  );

  async function postModifMobilhome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mobilhomeName = formData.get("mobilhomeName") as string;

    const managerIdRaw = formData.get("managerId") as string;
    const icalLinkRaw = formData.get("icalLink") as string | null;

    const newMobilhome = await modifMobilhomeOwner(id, mobilhome.id, {
      name: mobilhomeName,
      managerId: Number(managerIdRaw),
      icalLink: icalLinkRaw?.trim() || null,
    });
    console.log(newMobilhome);
    onUpdated(newMobilhome);

    onClose();
  }

  return (
    <>
      <PopCard
        title={`Modifier ${mobilhome.name} ? `}
        onClose={() => onClose()}
      >
        <form
          onSubmit={(e) => postModifMobilhome(e)}
          className="flex flex-col gap-4 p-4"
        >
          <label htmlFor="mobilhomeName">Nom:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            name="mobilhomeName"
            id="mobilhomeName"
            defaultValue={mobilhome.name}
            required
          />
          <label htmlFor="icalLink">Lien ical:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            name="icalLink"
            defaultValue={mobilhome.icalLink}
            id="icalLink"
          />
          <label htmlFor="managerName">Gérant:</label>
          <select
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            name="managerId"
            id="managerId"
            defaultValue={mobilhome.manager.id}
            required
          >
            <option value="">--choisir un gérant--</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} {manager.firstname}
              </option>
            ))}
          </select>
          <ValidBtn type="submit" />
        </form>
      </PopCard>
    </>
  );
}

export default PopModifMobilhome;
