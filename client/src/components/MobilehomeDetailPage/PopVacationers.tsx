import PopCard from "../ui/PopCard";
import type { TypeReservation, TypeVacationer } from "../../types/TypeFiles";
import AddBtn from "../ui/AddBtn";
import { useState } from "react";
import EditBtn from "../ui/EditBtn";
import DeleteBtn from "../ui/DeleteBtn";
import SendBtn from "../ui/SendBtn";
import {
  addVacationer,
  updateVacationer,
} from "../../services/vacationerService";
import { useOwner } from "../../context/ownerContext";
import { useParams } from "react-router-dom";

function PopVacationers({
  setVacationers,
  setReservations,
  resaId,
  onClose,
  vacationers,
}: {
  setVacationers: React.Dispatch<React.SetStateAction<TypeVacationer[]>>;
  setReservations: React.Dispatch<React.SetStateAction<TypeReservation[]>>;
  resaId: number;
  onClose: () => void;
  vacationers: TypeVacationer[];
}) {
  const [popAddVacationer, setPopAddVacationer] = useState(false);
  const [editVacationerId, setEditVacationerId] = useState<number>();
  const [popDeleteVacationer, setPopDeleteVacationer] = useState(false);
  const { owner } = useOwner();

  const { id } = useParams<{ id: string }>();

  const mobilhomeId = Number(id);
  const isInvalidId = mobilhomeId === null || Number.isNaN(mobilhomeId);

  async function postAddVacationer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const firstname = formData.get("firstname") as string;
    const age = Number(formData.get("age"));
    const newVacationner = {
      name: name,
      firstname: firstname,
      age: age,
    };

    if (!owner || isInvalidId) return;

    const postedVacationer = await addVacationer(
      owner.id,
      mobilhomeId,
      resaId,
      newVacationner,
    );
    setReservations((prevReservations) =>
      prevReservations.map((res) => {
        // 1. On identifie la réservation à modifier
        if (res.id === resaId) {
          return {
            ...res,
            // 2. On crée une copie du tableau vacationers en ajoutant le nouveau
            vacationers: [
              ...res.vacationers,
              {
                id: postedVacationer.id, // L'ID que l'API vient de te donner
                name: postedVacationer.name,
                firstname: postedVacationer.firstname,
                age: postedVacationer.age,
              },
            ],
          };
        }
        // 3. Si ce n'est pas la bonne réservation, on la retourne telle quelle
        return res;
      }),
    );
    setVacationers([...vacationers, postedVacationer]);
    setPopAddVacationer(false);
  }

  async function postModifVacationer(
    e: React.FormEvent<HTMLFormElement>,
    vacationerId: number,
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const firstname = formData.get("firstname") as string;
    const age = Number(formData.get("age"));
    const modifVacationer = {
      id: vacationerId,
      name: name,
      firstname: firstname,
      age: age,
    };

    if (!owner || isInvalidId) return;

    await updateVacationer(
      owner.id,
      mobilhomeId,
      resaId,
      vacationerId,
      modifVacationer,
    );
    setReservations((prevResas) =>
      prevResas.map((resa) => {
        if (resa.id === resaId) {
          return {
            ...resa,
            // On parcourt les vacanciers de cette réservation
            vacationers: resa.vacationers.map((v) => {
              if (v.id === vacationerId) {
                // C'est lui qu'on veut modifier
                return {
                  ...v,
                  name: name,
                  firstname: firstname,
                  age: age,
                };
              }
              // Les autres vacanciers restent inchangés
              return v;
            }),
          };
        }
        return resa;
      }),
    );
    setVacationers((prevVacationers) =>
      prevVacationers.map((vacationer) => {
        if (vacationer.id === vacationerId) {
          return {
            ...vacationer,
            name: name,
            firstname: firstname,
            age: age,
          };
        }
        return vacationer;
      }),
    );
    setEditVacationerId(undefined);
  }

  return (
    <PopCard title="Vacanciers" onClose={onClose}>
      <div>
        {vacationers.map((vacationer) => (
          <section
            className="flex flex-row justify-between items-center  border border-(--color-primary) p-2 m-2 rounded-lg gap-2"
            key={vacationer.id}
          >
            <form
              id={`edit-form-${vacationer.id}`}
              onSubmit={(e) => postModifVacationer(e, vacationer.id)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-row ">
                <label
                  className="w-18 text-sm"
                  htmlFor={`name-${vacationer.id}`}
                >
                  Nom:
                </label>
                <input
                  id={`name-${vacationer.id}`}
                  name="name"
                  className={`${editVacationerId === vacationer.id ? "bg-(--color-background)" : "bg-(--color-cards)"} px-2 w-40 rounded-lg border border-(--color-primary)`}
                  type="text"
                  defaultValue={vacationer.name}
                  required
                  disabled={!(editVacationerId === vacationer.id)}
                />
              </div>
              <div className="flex flex-row ">
                <label
                  className="w-18 text-sm"
                  htmlFor={`firstname-${vacationer.id}`}
                >
                  Prénom:
                </label>
                <input
                  className={`${editVacationerId === vacationer.id ? "bg-(--color-background)" : "bg-(--color-cards)"} px-2 w-40 rounded-lg border border-(--color-primary)`}
                  id={`firstname-${vacationer.id}`}
                  name="firstname"
                  type="text"
                  defaultValue={vacationer.firstname}
                  disabled={!(editVacationerId === vacationer.id)}
                />
              </div>
              <div className="flex flex-row ">
                <label
                  className="w-18 text-sm"
                  htmlFor={`age-${vacationer.id}`}
                >
                  Age :
                </label>
                <input
                  className={`${editVacationerId === vacationer.id ? "bg-(--color-background)" : "bg-(--color-cards)"} px-2 w-14 rounded-lg border border-(--color-primary)`}
                  id={`age-${vacationer.id}`}
                  name="age"
                  type="number"
                  defaultValue={vacationer.age}
                  disabled={!(editVacationerId === vacationer.id)}
                />
                {editVacationerId === vacationer.id ? (
                  <button
                    className="border border-(--color-primary) rounded-full px-2 ml-4 hover:bg-(--color-primary) hover:text-(--color-cards)"
                    type="submit"
                    id={`edit-form-${vacationer.id}`}
                  >
                    Modifier
                  </button>
                ) : null}
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <EditBtn onClick={() => setEditVacationerId(vacationer.id)} />
              <DeleteBtn onClick={() => setPopDeleteVacationer(true)} />
            </div>
          </section>
        ))}
      </div>
      {popAddVacationer ? (
        <section className="flex flex-row justify-between items-center  border border-(--color-primary) p-2 m-2 rounded-lg gap-2">
          <form
            id="add-form"
            onSubmit={(e) => postAddVacationer(e)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-row ">
              <label className="w-18 text-sm" htmlFor="add-name">
                Nom:
              </label>
              <input
                id="add-name"
                name="name"
                className="px-2 w-40 rounded-lg border border-(--color-primary)"
                type="text"
                required
              />
            </div>
            <div className="flex flex-row ">
              <label className="w-18 text-sm" htmlFor="add-firstname">
                Prénom:
              </label>
              <input
                className="px-2 w-40 rounded-lg border border-(--color-primary)"
                id="add-firstname"
                name="firstname"
                type="text"
              />
            </div>
            <div className="flex flex-row ">
              <label className="w-18 text-sm" htmlFor="add-age">
                Age :
              </label>
              <input
                className="px-2 w-14 rounded-lg border border-(--color-primary)"
                id="add-age"
                name="age"
                type="number"
              />
            </div>
          </form>
          <div className="flex flex-col gap-2">
            <SendBtn form="add-form" type="submit" />
          </div>
        </section>
      ) : null}
      <div className="m-2 flex flex-row-reverse">
        <AddBtn onClick={() => setPopAddVacationer(true)} />
      </div>
    </PopCard>
  );
}
export default PopVacationers;
