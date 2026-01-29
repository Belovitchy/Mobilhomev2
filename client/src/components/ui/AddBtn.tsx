import { FaPlus } from "react-icons/fa6";

function AddBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
      <FaPlus
        className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)"
        onClick={() => onClick()}
      />
    </div>
  );
}

export default AddBtn;
