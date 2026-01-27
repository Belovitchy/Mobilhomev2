import { ImExit } from "react-icons/im";
import { modifMail } from "../../services/authService";
import type { TypeOwner } from "../../types/TypeFiles";

function PopModifMail({
  id,
  setOwner,
  onClose,
}: {
  id: number;
  setOwner: React.Dispatch<React.SetStateAction<TypeOwner | null>>;
  onClose: () => void;
}) {
  async function postModifMail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const confirmEmail = formData.get("confirmEmail") as string;
    console.log("Email:", email);
    console.log("Confirm Email:", confirmEmail);
    if (email !== confirmEmail) {
      alert("Les emails ne correspondent pas");
      return;
    }
    const modifMailOwner = await modifMail(id, email);
    console.log(modifMailOwner);
    setOwner(modifMailOwner);
    onClose();
  }
  return (
    <form
      onSubmit={(e) => postModifMail(e)}
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto  border-2 border-(--color-primary) rounded-2xl flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-auto mb-4">Nouveau mail</h1>
        <ImExit
          onClick={() => onClose()}
          className="text-2xl hover:cursor-pointer"
        />
      </div>
      <input
        className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
        type="email"
        id="email"
        name="email"
        required
      />
      <h3>Confirmez</h3>
      <input
        className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
        type="email"
        id="confirmEmail"
        name="confirmEmail"
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

export default PopModifMail;
