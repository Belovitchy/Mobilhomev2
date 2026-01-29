import { ImExit } from "react-icons/im";

function PopCard({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <section className="absolute top-1/16 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto  border-2 border-(--color-primary) rounded-2xl ">
      <div className="flex justify-between items-center p-6 ">
        <h1 className="text-2xl font-bold  flex items-center max-w-5/6">
          {title}
        </h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      {children}
    </section>
  );
}

export default PopCard;
