import { MdOutlineModeEditOutline } from "react-icons/md";

function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
      <MdOutlineModeEditOutline
        onClick={() => onClick()}
        className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)"
      />
    </div>
  );
}

export default EditBtn;
