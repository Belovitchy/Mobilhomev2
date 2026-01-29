import { modifMail } from "../../services/authService";
import type { TypeOwner } from "../../types/TypeFiles";
import PopCard from "../ui/PopCard";

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
    <PopCard title="Nouveau mail" onClose={() => onClose()}>
      <form
        onSubmit={(e) => postModifMail(e)}
        className=" flex flex-col gap-4 p-4"
      >
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
    </PopCard>
  );
}

export default PopModifMail;
