import { ImExit } from "react-icons/im";

function PopAddLink({ id, onClose }: { id: number; onClose: () => void }) {
  async function postAddLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const link = formData.get("text") as string;

    onClose();
  }

  return (
    <form
      onSubmit={(e) => postAddLink(e)}
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto  border-2 border-(--color-primary) rounded-2xl flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto mb-4">Nouveau lien</h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <input
        className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
        type="text"
        id="text"
        name="text"
        required
      />

      <button
        type="submit"
        className="w-40 mx-auto bg-(--color-cards) text-(--color-primary) border-2 border-(--color-primary) px-4 py-2 rounded-full hover:bg-(--color-primary) hover:text-(--color-cards) transition-colors duration-300 my-8 hover:cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PopAddLink;
