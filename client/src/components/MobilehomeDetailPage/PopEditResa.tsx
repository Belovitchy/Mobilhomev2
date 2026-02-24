import type { TypeReservation } from "../../types/TypeFiles";
import PopCard from "../ui/PopCard";
import ValidBtn from "../ui/ValidBtn";
import { modifResa } from "../../services/reservationService";

function PopEditResa({
  setReservations,
  ownerId,
  mobilhomeId,
  allResas,
  onClose,
  resa,
}: {
  setReservations: React.Dispatch<React.SetStateAction<TypeReservation[]>>;
  ownerId: number;
  mobilhomeId: number;
  allResas: TypeReservation[];
  onClose: () => void;
  resa: TypeReservation;
}) {
  async function postModifResa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("postEditResa");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const color = formData.get("color") as string;
    const comment = formData.get("comment") as string;
    const numberPerson = Number(formData.get("numberPerson"));
    const funpass = formData.get("funpass") === "on" ? 1 : 0;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const immat = formData.get("immat") as string;
    const sibluResa = formData.get("sibluResa") as string;

    const res = {
      id: resa.id,
      name: name,
      startDate: startDate,
      endDate: endDate,
      color: color,
      comment: comment,
      numberPerson: numberPerson,
      funpass: funpass,
      email: email,
      phone: phone,
      immat: immat,
      sibluResa: sibluResa,
      mobilhomeId: mobilhomeId,
      vacationers: resa.vacationers,
    };
    console.log("res", res);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj >= endDateObj) {
      console.log("erreur date");
      return;
    }
    const allWithoutThisEdit = allResas.filter((r) => r.id !== resa.id);

    const isOverlapping = allWithoutThisEdit.some((res) => {
      const resStart = new Date(res.startDate).setHours(12, 0, 0, 0);
      const resEnd = new Date(res.endDate).setHours(12, 0, 0, 0);
      const newStart = new Date(startDate).setHours(12, 0, 0, 0);
      const newEnd = new Date(endDate).setHours(12, 0, 0, 0);

      return resStart < newEnd && newStart < resEnd;
    });
    if (isOverlapping) {
      console.log("erreur chevauche");
      return;
    }
    //service puttResa
    const updateResa = await modifResa(ownerId, mobilhomeId, resa.id, res);
    console.log("updateResa", updateResa);
    setReservations((prevResas) => {
      return prevResas.map((r) => (r.id === resa.id ? updateResa : r));
    });

    onClose();
  }

  return (
    <PopCard title="Modifier une réservation" onClose={onClose}>
      <form
        onSubmit={(e) => postModifResa(e)}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex flex-row justify-between gap-2">
          <div>
            <label htmlFor="startDate">Du:</label>
            <input
              className="bg-(--color-background) text-xs p-2 max-w-28 rounded-lg"
              type="date"
              id="startdDate"
              name="startDate"
              defaultValue={
                new Date(resa.startDate).toISOString().split("T")[0]
              }
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">Au:</label>
            <input
              className="bg-(--color-background) text-xs p-2 max-w-28 rounded-lg"
              type="date"
              id="endDate"
              name="endDate"
              defaultValue={new Date(resa.endDate).toISOString().split("T")[0]}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            id="name"
            name="name"
            defaultValue={resa.name}
            required
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="color">Couleur:</label>
            <input
              className="bg-(--color-background) w-8 h-8 rounded-lg "
              type="color"
              id="color"
              name="color"
              defaultValue={resa.color}
              required
            />
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="numberPerson">Nbr:</label>
            <input
              className="bg-(--color-background) w-16 h-8 p-2 rounded-lg "
              type="number"
              id="numberPerson"
              name="numberPerson"
              defaultValue={resa.numberPerson}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            id="email"
            name="email"
            defaultValue={resa.email}
          />
        </div>
        <div>
          <label htmlFor="phone">Tel:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            id="phone"
            name="phone"
            defaultValue={resa.phone}
          />
        </div>
        <div className="flex flex-row justify-between gap-2 items-center">
          <div className="flex flex-row items-center">
            <label htmlFor="immat">Immat:</label>
            <input
              className="bg-(--color-background) w-28 p-2 rounded-lg "
              type="text"
              id="immat"
              name="immat"
              defaultValue={resa.immat}
            />
          </div>
          <div className="flex flex-row  gap-2">
            <label htmlFor="funpass">funpass:</label>
            <input
              className="w-6 h-6 appearance-none 
              bg-(--color-background) 
              border border-(--color-primary) 
              rounded-lg 
              checked:bg-(--color-background) 
              checked:border-(--color-primary)
              cursor-pointer
              relative
              after:content-['✓'] 
              after:absolute after:text-(--color-primary) after:text-sm after:font-bold
              after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
              after:hidden checked:after:block"
              type="checkbox"
              id="funpass"
              name="funpass"
              defaultValue={resa.funpass ? "on" : "off"}
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Commentaire:</label>
          <textarea
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            id="comment"
            name="comment"
            defaultValue={resa.comment}
          />
        </div>
        <div className="flex flex-row justify-center gap-2 items-center">
          <label htmlFor="sibluResa">N° Siblu:</label>
          <input
            className="bg-(--color-background)  p-2 rounded-lg max-w-28"
            type="text"
            id="sibluResa"
            name="sibluResa"
            defaultValue={resa.sibluResa}
          />
        </div>
        <ValidBtn type="submit" />
      </form>
    </PopCard>
  );
}

export default PopEditResa;
