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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <section className="absolute top-1/16 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto  border-2 border-(--color-primary) rounded-2xl max-h-[90vh] flex flex-col overflow-hidden ">
        <div className="flex justify-between items-center p-6 ">
          <h1 className="text-2xl font-bold  flex items-center max-w-5/6">
            {title}
          </h1>
          <ImExit
            onClick={() => onClose()}
            className="text-2xl hover:cursor-pointer"
          />
        </div>
        <div className="overflow-y-auto custom-scrollbar">{children}</div>
      </section>
    </div>
  );
}

export default PopCard;
