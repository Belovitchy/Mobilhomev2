import PopCard from "../ui/PopCard";
import ValidBtn from "../ui/ValidBtn";
import type { TypeReservation } from "../../types/TypeFiles";
import { addResa } from "../../services/reservationService";

function PopAddResa({
  month,
  year,
  onClose,
  ownerId,
  mobilhomeId,
  allResas,
  setReservations,
}: {
  month: number;
  year: number;
  onClose: () => void;
  ownerId: number;
  mobilhomeId: number;
  allResas: TypeReservation[];
  setReservations: React.Dispatch<React.SetStateAction<TypeReservation[]>>;
}) {
  async function postAddResa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("allResas", allResas);
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
    };
    console.log("res", res);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj >= endDateObj) {
      console.log("erreur date");
      return;
    }

    const isOverlapping = allResas.some((res) => {
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
    const newResa = await addResa(ownerId, mobilhomeId, res);
    console.log("newresa", newResa);
    setReservations([...allResas, newResa]);
    onClose();
  }

  return (
    <PopCard title="Ajouter une réservation" onClose={() => onClose()}>
      <form
        onSubmit={(e) => postAddResa(e)}
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
              defaultValue={`${year}-${String(month + 1).padStart(2, "0")}-01`}
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
              defaultValue={`${year}-${String(month + 1).padStart(2, "0")}-01`}
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
              defaultValue="#60b79d"
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
          />
        </div>
        <div>
          <label htmlFor="phone">Tel:</label>
          <input
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            type="text"
            id="phone"
            name="phone"
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
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Commentaire:</label>
          <textarea
            className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
            id="comment"
            name="comment"
          />
        </div>
        <div className="flex flex-row justify-center gap-2 items-center">
          <label htmlFor="sibluResa">N° Siblu:</label>
          <input
            className="bg-(--color-background)  p-2 rounded-lg max-w-28"
            type="text"
            id="sibluResa"
            name="sibluResa"
          />
        </div>
        <ValidBtn type="submit" />
      </form>
    </PopCard>
  );
}

export default PopAddResa;
