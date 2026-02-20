import type { TypeReservation } from "../../types/TypeFiles";
import DeleteBtn from "../ui/DeleteBtn";
import EditBtn from "../ui/EditBtn";
import AddBtn from "../ui/AddBtn";
import { memo, useState } from "react";
import PopAddResa from "./PopAddResa";
import { deleteResa } from "../../services/reservationService";
import PopEditResa from "./PopEditResa";

type DayCell = {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  morning: TypeReservation | null;
  afternoon: TypeReservation | null;
};

type Week = DayCell[];

interface MonthCalendarProps {
  data: {
    cal: Week[];
    monthResas: TypeReservation[];
  };
  label: string;
}

function MonthCalendar({
  ownerId,
  mobilhomeId,
  allResas,
  setReservations,
  monthView,
  month,
  year,
}: {
  ownerId: number;
  mobilhomeId: number;
  allResas: TypeReservation[];
  setReservations: React.Dispatch<React.SetStateAction<TypeReservation[]>>;
  monthView: MonthCalendarProps;
  month: number;
  year: number;
}) {
  const [popAddResa, setPopAddResa] = useState(false);
  const [popEditResa, setPopEditResa] = useState(false);
  const [editResa, setEditResa] = useState<TypeReservation>();

  function handleAddRes() {
    setPopAddResa(true);
  }
  // console.log("monthView", monthView);

  async function handleDeleteResa(
    ownerId: number,
    mobilhomeId: number,
    resaId: number,
  ) {
    await deleteResa(ownerId, mobilhomeId, resaId);
    setReservations((prevResas) =>
      prevResas.filter((resa) => resa.id !== resaId),
    );
  }

  function handleEditResa(resa: TypeReservation) {
    setPopEditResa(true);
    setEditResa(resa);
  }

  return (
    <>
      {popEditResa && editResa ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopEditResa
            setReservations={setReservations}
            ownerId={ownerId}
            allResas={allResas}
            mobilhomeId={mobilhomeId}
            resa={editResa}
            onClose={() => setPopEditResa(false)}
          />
        </div>
      ) : null}
      {popAddResa && ownerId ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddResa
            month={month}
            year={year}
            ownerId={ownerId}
            mobilhomeId={mobilhomeId}
            allResas={allResas}
            setReservations={setReservations}
            onClose={() => setPopAddResa(false)}
          />
        </div>
      ) : null}
      <section className="flex flex-col lg:flex-row wrap gap-2 border-2 border-(--color-primary) p-2 rounded-lg w-full">
        <div className="min-w-1/2">
          <h2 className="text-xl h-14 mb-4 bg-(--color-cards) p-2 rounded-lg">
            {monthView.label} {year}
          </h2>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <div
                key={d}
                className="text-center font-bold text-(--color-primary)"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {" "}
            {/* C'est ici que tu gères le gap */}
            {monthView.data.cal.flat().map((day) => (
              <div
                key={day.date.toISOString()}
                className={`border border-(--color-primary) p-1 rounded-md ${!day.isCurrentMonth ? "opacity-60 bg-(--color-cards)" : "bg-(--color-cards)"}`}
              >
                <div className="text-right text-xs mb-1">{day.dayNumber}</div>
                <div className="flex flex-row h-4 w-full rounded-sm overflow-hidden">
                  <div
                    className="flex-1"
                    style={{
                      backgroundColor: day.morning?.color || "transparent",
                    }}
                  />
                  <div
                    className="flex-1"
                    style={{
                      backgroundColor: day.afternoon?.color || "transparent",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div>
            <h2 className="h-14 flex flex-row justify-between items-center text-xl mb-4 bg-(--color-cards) p-2 rounded-lg">
              Réservations {monthView.label.toLocaleLowerCase()} {year}
              <AddBtn onClick={() => handleAddRes()} />
            </h2>
            {monthView.data.monthResas.length > 0 ? (
              <div className="flex flex-col gap-2 justify-center ">
                {monthView.data.monthResas.map((r) => (
                  <div
                    className="flex flex-row justify-between  border-4 rounded-full px-4 py-1 bg-(--color-cards) items-center"
                    key={r.id}
                    style={{ borderColor: r.color }}
                  >
                    <div className="text-base m-auto">
                      {r.name.toLocaleUpperCase()} du{" "}
                      {new Date(r.startDate).toLocaleDateString()}
                      <br /> au {new Date(r.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex flex-row gap-2">
                      <EditBtn onClick={() => handleEditResa(r)} />

                      <DeleteBtn
                        onClick={() =>
                          handleDeleteResa(ownerId, mobilhomeId, r.id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucune réservation</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(MonthCalendar);
