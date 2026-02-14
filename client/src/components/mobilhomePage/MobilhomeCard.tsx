import { Link } from "react-router";
import type { TypeMobilhome } from "../../types/TypeFiles";
import { useState } from "react";
import PopModifMobilhome from "./PopModifMobilhome";
import PopDeletMobilhome from "./PopDeletMobilhome";
import EditBtn from "../ui/EditBtn";
import DeleteBtn from "../ui/DeleteBtn";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function MobilhomeCard({
  id,
  mobilhome,
  ownerMobilhome,
  onUpdated,
  onDelete,
}: {
  id: number;
  mobilhome: TypeMobilhome;
  ownerMobilhome: TypeMobilhome[];
  onUpdated: (updateMobilhome: TypeMobilhome) => void;
  onDelete: (mobilhomeId: number) => void;
}) {
  const [popMOdifMobilhomeCard, setPopMofidMobilhomeCard] = useState(false);
  const [popDeleteMobilhomeCard, setPopDeleteMobilhomeCard] = useState(false);

  function handleModifMobilhome() {
    setPopMofidMobilhomeCard(true);
  }

  function handleDeleteMobilhome() {
    setPopDeleteMobilhomeCard(true);
  }
  console.log(mobilhome);

  return (
    <>
      {popMOdifMobilhomeCard ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopModifMobilhome
            id={id}
            mobilhome={mobilhome}
            onClose={() => setPopMofidMobilhomeCard(false)}
            ownerMobilhome={ownerMobilhome}
            onUpdated={onUpdated}
          />
        </div>
      ) : null}

      {popDeleteMobilhomeCard ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopDeletMobilhome
            id={id}
            mobilhome={mobilhome}
            onClose={() => setPopDeleteMobilhomeCard(false)}
            onDelete={onDelete}
          />
        </div>
      ) : null}

      <section className="relative bg-(--color-cards) rounded-lg p-4 shadow-md min-w-80 min-h-60 flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div className="absolute bottom-2 right-4 rounded-lg border-2 border-(--color-primary) p-2 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)">
            <Link to={`/dashboard/mobilhomes/${mobilhome.id}`}>Détails</Link>
          </div>
          <h2 className="text-lg font-semibold">{mobilhome.name}</h2>
          <div className="flex flex-row gap-2">
            <EditBtn
              onClick={() => {
                handleModifMobilhome();
              }}
            />
            <DeleteBtn
              onClick={() => {
                handleDeleteMobilhome();
              }}
            />
          </div>
        </div>
        <p className="flex flex-row items-center">
          Lien ical:
          {mobilhome.icalLink ? (
            <FaCheck className=" ml-2 text-(--color-primary)" />
          ) : (
            <ImCross className="ml-2 text-(--color-secondary)" />
          )}
        </p>
        <h3>
          {mobilhome.manager.name} {mobilhome.manager.firstname}
        </h3>

        <p>{mobilhome.manager.email}</p>
        <p>{mobilhome.manager.telephone}</p>
      </section>
    </>
  );
}

export default MobilhomeCard;
