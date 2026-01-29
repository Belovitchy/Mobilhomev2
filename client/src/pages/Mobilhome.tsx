import { useOwner } from "../context/ownerContext";
import { useEffect, useState } from "react";
import type { TypeMobilhome } from "../types/TypeFiles";
import MobilhomeCard from "../components/mobilhomePage/MobilhomeCard";
import PopAddMobilhome from "../components/mobilhomePage/PopAddMobilhome";
import { getMobilhomesByOwner } from "../services/mobilhomeService";
import AddBtn from "../components/ui/AddBtn";

function Mobilhome() {
  const { owner } = useOwner();
  const [ownerMobilhome, setOwnerMobilhome] = useState<TypeMobilhome[]>([]);
  const [popAddMobilhome, setPopAddMobilhome] = useState(false);

  useEffect(() => {
    if (!owner) return;
    const axiosMobilhomeByOwner = async () => {
      const data = await getMobilhomesByOwner(owner.id);
      console.log("mes mobilhome:", data);
      setOwnerMobilhome(data);
    };
    axiosMobilhomeByOwner();
  }, [owner]);

  const handleMobilhomeUpdate = (updateMobilhome: TypeMobilhome) => {
    setOwnerMobilhome((prevMobilhome) =>
      prevMobilhome.map((mobilhome) =>
        mobilhome.id === updateMobilhome.id ? updateMobilhome : mobilhome,
      ),
    );
  };

  const handleMobilhomeDelete = (mobilhomeId: number) => {
    setOwnerMobilhome((prevMobilhome) =>
      prevMobilhome.filter((mobilhome) => mobilhome.id !== mobilhomeId),
    );
  };

  if (!owner) {
    return null;
  }

  return (
    <>
      {popAddMobilhome ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddMobilhome
            id={owner!.id}
            onClose={() => setPopAddMobilhome(false)}
            setOwnerMobilhome={setOwnerMobilhome}
          />
        </div>
      ) : null}
      <h1 className="flex flex-row items-center justify-center gap-6  text-2xl bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary) mb-6">
        Mes mobilhomes{" "}
        <AddBtn
          onClick={() => {
            setPopAddMobilhome(true);
          }}
        />
      </h1>
      <section className="flex flex-wrap gap-4 justify-center">
        {ownerMobilhome.map((mobilhome) => (
          <div key={mobilhome.id}>
            <MobilhomeCard
              onDelete={handleMobilhomeDelete}
              onUpdated={handleMobilhomeUpdate}
              mobilhome={mobilhome}
              id={owner!.id}
              ownerMobilhome={ownerMobilhome}
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default Mobilhome;
