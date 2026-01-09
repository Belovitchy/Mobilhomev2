import { Link } from "react-router";
import type { TypeMobilhome } from "../types/TypeFiles";

function MobilhomeCard({ mobilhome }: { mobilhome: TypeMobilhome }) {
  return (
    <Link to={`/dashboard/mobilhomes/${mobilhome.id}`}>
      <section className="bg-(--color-cards) rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold">{mobilhome.name}</h2>
        <h3>
          {mobilhome.managerName} {mobilhome.managerFirstname}
        </h3>
      </section>
    </Link>
  );
}

export default MobilhomeCard;
