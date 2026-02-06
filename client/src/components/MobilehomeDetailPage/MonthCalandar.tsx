import { useEffect } from "react";

function MonthCalandar({ year, month }: { year: number; month: string }) {
  useEffect(() => {}, [year]);

  return (
    <section>
      <h1>{month}</h1>
      <article className="grid grid-cols-(--cal-grid-cols) grid-rows-(--cal-grid-rows)  gap-2">
        <div className="bg-amber-200">n°</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </article>
    </section>
  );
}

export default MonthCalandar;
