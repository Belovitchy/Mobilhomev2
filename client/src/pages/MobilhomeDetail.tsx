import { useState, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getMobilhomeDetail } from "../services/mobilhomeService";
import { useOwner } from "../context/ownerContext";
import type { TypeMobilhome, TypeReservation } from "../types/TypeFiles";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

function MobilhomeDetail() {
  const { owner } = useOwner();
  const [year, setYear] = useState<number>(2026);
  const [mobilhome, setMobilhome] = useState<TypeMobilhome>();
  const [reservations, setReservations] = useState<TypeReservation[]>([]);
  const [month, setMonth] = useState<number>(1);

  //recupérer id mobilhome de l'URL
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Mobilhome introuvable</div>;
  }

  const mobilhomeId = Number(id);
  if (isNaN(mobilhomeId)) {
    return <Navigate to="/notfound" />;
  }

  ///////////////////////////calandar by month/////////////////

  type DayCell = {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    morning: TypeReservation | null;
    afternoon: TypeReservation | null;
  };

  type Week = DayCell[];

  function buildMonthCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    console.log("firstDay:", firstDay);
    console.log("lastDay:", lastDay);

    // Lundi = 0
    const startOffset = (firstDay.getDay() + 6) % 7;
    const calendarStart = new Date(year, month, 1 - startOffset);

    const weeks: Week[] = [];
    let week: Week = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(calendarStart);
      date.setDate(calendarStart.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;

      week.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth,
        morning: null,
        afternoon: null,
      });

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    return weeks;
  }

  function expandReservation(reservation: TypeReservation) {
    const days = [];
    let current = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }

  function applyReservations(
    calendar: Week[],
    reservations: TypeReservation[],
  ) {
    // 1. On boucle sur chaque réservation reçue
    reservations.forEach((res) => {
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);

      // 2. On récupère tous les jours concernés par CETTE réservation
      const days = expandReservation(res);

      days.forEach((date) => {
        const dateStr = date.toDateString();

        // 3. On cherche la cellule correspondante dans notre calendrier
        calendar.forEach((week) => {
          week.forEach((cell) => {
            if (cell.date.toDateString() === dateStr) {
              const isStartDate = dateStr === start.toDateString();
              const isEndDate = dateStr === end.toDateString();

              if (isStartDate) {
                // On garde ce qu'il y a déjà le matin (au cas où une autre résa finit)
                // et on occupe l'après-midi
                cell.afternoon = res;
              } else if (isEndDate) {
                // On occupe le matin et on laisse l'après-midi libre (ou pour la suivante)
                cell.morning = res;
              } else {
                // Journée complète
                cell.morning = res;
                cell.afternoon = res;
              }
            }
          });
        });
      });
    });
  }

  const calendar = useMemo(() => {
    const cal = buildMonthCalendar(year, month);
    applyReservations(cal, reservations);
    return cal;
  }, [year, month, reservations]);

  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!owner) return;
    const axiosMobilhomeDetail = async () => {
      const data = await getMobilhomeDetail(owner.id, mobilhomeId);

      if (data.ownerId !== owner.id) {
        return <Navigate to="/notfound" />;
      }
      setMobilhome(data);
      setReservations(data.reservations);
      console.log("detail mobilhome:", data);
    };
    axiosMobilhomeDetail();
  }, [mobilhomeId, owner]);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-6   bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary) mb-6">
        <h1 className="text-2xl ">Calendrier : {mobilhome?.name}</h1>
        <div className="flex flex-row bg-(--color-card)">
          <input
            readOnly
            className="w-16 bg-(--color-card)  text-center border border-(--color-primary) rounded-sm"
            value={year}
          />
          <div className="flex flex-col">
            <button
              onClick={() => setYear(year + 1)}
              type="button"
              className="hover:scale-110 hover:cursor-pointer"
            >
              <FaArrowAltCircleUp />
            </button>
            <button
              onClick={() => setYear(year - 1)}
              type="button"
              className="hover:scale-105 hover:cursor-pointer"
            >
              <FaArrowAltCircleDown />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {/* En-tête des jours */}
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

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-0.5">
          {" "}
          {/* C'est ici que tu gères le gap */}
          {calendar.flat().map((day) => (
            <div
              key={day.date.toISOString()}
              className={`border border-(--color-primary) p-1 rounded-md ${!day.isCurrentMonth ? "opacity-40 bg-(--color-cards)" : "bg-(--color-cards)"}`}
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
    </>
  );
}

export default MobilhomeDetail;
