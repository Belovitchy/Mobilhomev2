import { Link } from "react-router";
import type { TypeMobilhome } from "../types/TypeFiles";

function MobilhomeCard({ mobilhome }: { mobilhome: TypeMobilhome }) {
  return (
    <Link to={`/dashboard/mobilhomes/${mobilhome.id}`}>
      <section className="bg-(--color-cards) rounded-lg p-4 shadow-md min-w-80 min-h-50 flex flex-col justify-between">
        <h2 className="text-lg font-semibold">{mobilhome.name}</h2>
        <h3>
          {mobilhome.manager.name} {mobilhome.manager.firstname}
        </h3>
        <p>{mobilhome.manager.email}</p>
        <p>{mobilhome.manager.telephone}</p>
      </section>
    </Link>
  );
}

export default MobilhomeCard;
