import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getMobilhomeDetail } from "../services/mobilhomeService";
import { useOwner } from "../context/ownerContext";
import type { TypeMobilhome, TypeReservation } from "../types/TypeFiles";
import { useNavigate } from "react-router";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import MonthCalendar from "../components/MobilehomeDetailPage/MonthCalendar";

type DayCell = {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  morning: TypeReservation | null;
  afternoon: TypeReservation | null;
};

type Week = DayCell[];

const months = [
  "JANVIER",
  "FEVRIER",
  "MARS",
  "AVRIL",
  "MAI",
  "JUIN",
  "JUILLET",
  "AOUT",
  "SEPTEMBRE",
  "OCTOBRE",
  "NOVEMBRE",
  "DECEMBRE",
];

function buildMonthCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);

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
  const current = new Date(reservation.startDate);
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
  monthIndex: number,
) {
  // On normalise le mois (pour gérer -1 ou 12)
  const normalizedMonth = (monthIndex + 12) % 12;
  const filteredRes: TypeReservation[] = [];
  // 1. On boucle sur chaque réservation reçue
  reservations.forEach((res) => {
    const start = new Date(res.startDate);
    const end = new Date(res.endDate);

    // Collecter les réservations qui commencent ce mois-ci
    if (start.getMonth() === normalizedMonth) {
      filteredRes.push(res);
    }

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

  return filteredRes;
}

function MobilhomeDetail() {
  const { owner } = useOwner();
  const [year, setYear] = useState<number>(2026);
  const [mobilhome, setMobilhome] = useState<TypeMobilhome>();
  const [reservations, setReservations] = useState<TypeReservation[]>([]);
  const [month, setMonth] = useState<number>(1);

  const navigate = useNavigate();

  //recupérer id mobilhome de l'URL
  const { id } = useParams<{ id: string }>();

  const mobilhomeId = id ? Number(id) : null;
  const isInvalidId = mobilhomeId === null || Number.isNaN(mobilhomeId);

  const calendars = useMemo(() => {
    // Fonction interne pour générer un mois complet avec ses réservations
    const generateFullMonth = (y: number, m: number) => {
      const cal = buildMonthCalendar(y, m);
      // On récupère les résas filtrées si on en a besoin pour l'affichage
      const monthResas = applyReservations(cal, reservations, m);
      return { cal, monthResas };
    };
    return [
      {
        data: generateFullMonth(year, month - 1),
        label: months[(month + 11) % 12],
        thisMonth: (month + 11) % 12,
        thisYear: month === 0 ? year - 1 : year,
      },
      {
        data: generateFullMonth(year, month),
        label: months[month],
        thisMonth: month,
        thisYear: year,
      },
      {
        data: generateFullMonth(year, month + 1),
        label: months[(month + 13) % 12],
        thisMonth: (month + 13) % 12,
        thisYear: month === 11 ? year + 1 : year,
      },
    ];
  }, [year, month, reservations]);

  ///////////////////////////////////////////////////////////////

  function upMonth() {
    if (month === 11) setMonth(0);
    else setMonth(month + 1);
  }

  function downMonth() {
    if (month === 0) setMonth(11);
    else setMonth(month - 1);
  }

  useEffect(() => {
    if (!owner || isInvalidId || !mobilhomeId) return;
    const axiosMobilhomeDetail = async () => {
      const data = await getMobilhomeDetail(owner.id, mobilhomeId);

      if (data.ownerId !== owner.id) {
        navigate("/notfound");
        return;
      }
      setMobilhome(data);

      setReservations(data.reservations);
      console.log("detail mobilhome:", data);
    };
    axiosMobilhomeDetail();
  }, [mobilhomeId, owner, isInvalidId, navigate]);

  if (!id || isInvalidId) {
    navigate("/notfound");
    return;
  }

  if (!owner) {
    navigate("/");
    return;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-6   bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary) mb-6">
        <h1 className="text-2xl ">Calendrier : {mobilhome?.name}</h1>
        <div className="flex flex-col  gap-2">
          <div className="flex flex-row bg-(--color-card)">
            <input
              readOnly
              className="w-20 bg-(--color-card) text-xs  text-center border border-(--color-primary) rounded-l-sm"
              value={months[month]}
            />
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => upMonth()}
                type="button"
                className="hover:scale-110 hover:cursor-pointer"
              >
                <MdArrowDropUp className="text-(--color-cards) bg-(--color-primary) rounded-tr-lg" />
              </button>
              <button
                onClick={() => downMonth()}
                type="button"
                className="hover:scale-105 hover:cursor-pointer"
              >
                <MdArrowDropDown className="text-(--color-cards) bg-(--color-primary) rounded-br-lg" />
              </button>
            </div>
          </div>
          <div className="flex flex-row bg-(--color-card)">
            <input
              readOnly
              className="w-16 bg-(--color-card)  text-center border border-(--color-primary) rounded-l-sm"
              value={year}
            />
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setYear(year + 1)}
                type="button"
                className="hover:scale-110 hover:cursor-pointer"
              >
                <MdArrowDropUp className="text-(--color-cards) bg-(--color-primary) rounded-tr-lg" />
              </button>
              <button
                onClick={() => setYear(year - 1)}
                type="button"
                className="hover:scale-105 hover:cursor-pointer"
              >
                <MdArrowDropDown className="text-(--color-cards) bg-(--color-primary) rounded-br-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-10">
          {/* tableau pour boucler sur les trois */}
          {calendars.map((monthView) => (
            <MonthCalendar
              ownerId={owner?.id}
              mobilhomeId={mobilhomeId}
              allResas={reservations}
              setReservations={setReservations}
              key={monthView.label}
              monthView={monthView}
              month={monthView.thisMonth}
              year={monthView.thisYear}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MobilhomeDetail;
