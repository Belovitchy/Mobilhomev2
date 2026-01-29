import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useOwner } from "../../context/ownerContext";
import { modifPassword } from "../../services/authService";
import PopCard from "../ui/PopCard";

function PopModifPasseword({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const { setOwner } = useOwner();
  const [showPassword, setShowPassword] = useState(false);
  async function postModifPasseword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (newPassword !== confirmNewPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const modifPassewordOwner = await modifPassword(
      id,
      oldPassword,
      newPassword,
    );
    setOwner(modifPassewordOwner);
    onClose();
  }

  return (
    <PopCard title="Nouveau mot de passe" onClose={() => onClose()}>
      <form
        onSubmit={(e) => postModifPasseword(e)}
        className=" flex flex-col gap-4 p-4"
      >
        <h2>Ancien mot de passe:</h2>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type="text"
          id="oldPassword"
          name="oldPassword"
          required
        />
        <h2>Nouveau mot de passe:</h2>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type={showPassword ? "text" : "password"}
          id="newPassword"
          name="newPassword"
          required
        />

        <div className="flex flex-row justify-between">
          <h3>Confirmez:</h3>
          <button
            className="hover:cursor-pointer flex items-center text-(--color-primary)"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type={showPassword ? "text" : "password"}
          id="confirmNewPassword"
          name="confirmNewPassword"
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

export default PopModifPasseword;
