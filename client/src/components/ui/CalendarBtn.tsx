import { FaRegCalendarDays } from "react-icons/fa6";

function CalendarBtn() {
  return (
    <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
      <FaRegCalendarDays className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary) p-0.5" />
    </div>
  );
}

export default CalendarBtn;
