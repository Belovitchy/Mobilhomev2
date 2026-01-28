import { RiDeleteBin5Line } from "react-icons/ri";

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
      <RiDeleteBin5Line
        onClick={() => onClick()}
        className="text-(--color-secondary) rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-secondary)"
      />
    </div>
  );
}

export default DeleteBtn;
