import { useOwner } from "../context/ownerContext";
import { useEffect, useState } from "react";
import type { TypeMobilhome } from "../types/TypeFiles";
import { FaPlus } from "react-icons/fa6";
import MobilhomeCard from "../components/MobilhomeCard";
import PopAddMobilhome from "../components/PopAddMobilhome";

function Mobilhome() {
  const { owner } = useOwner();
  const [ownerMobilhome, setOwnerMobilhome] = useState<TypeMobilhome[]>([]);
  const [popAddMobilhome, setPopAddMobilhome] = useState(false);

  useEffect(() => {
    if (!owner) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/owner/mobilhome/${owner.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("mes mobilhome:", data);
        setOwnerMobilhome(data);
      });
  }, [owner]);

  return (
    <>
      {popAddMobilhome ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddMobilhome
            id={owner?.id}
            onClose={() => setPopAddMobilhome(false)}
          />
        </div>
      ) : null}
      <h1 className="flex flex-row items-center justify-center gap-6  text-2xl bg-[var(--color-cards)] text-[var(--color-primary)] p-4 rounded-lg w-full text-center border-2 border-[var(--color-primary)] mb-6">
        Mes mobilhomes{" "}
        <div className="w-10 h-10 bg-[var(--color-cards)] rounded-lg border-2 border-[var(--color-primary)] flex items-center justify-center">
          <FaPlus
            className="rounded-lg w-10/12 h-10/12 hover:text-[var(--color-cards)] hover:cursor-pointer hover:bg-[var(--color-primary)]"
            onClick={() => setPopAddMobilhome(true)}
          />
        </div>
      </h1>
      <section className="flex flex-wrap gap-4">
        {ownerMobilhome.map((mobilhome) => (
          <div key={mobilhome.id}>
            <MobilhomeCard mobilhome={mobilhome} />
          </div>
        ))}
      </section>
    </>
  );
}

export default Mobilhome;
