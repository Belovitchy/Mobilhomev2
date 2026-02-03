import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ValidBtn from "../ui/ValidBtn";
import PopCard from "../ui/PopCard";
import { signIn } from "../../services/adminService";
import type { TypeOwner } from "../../types/TypeFiles";
import { useOwner } from "../../context/ownerContext";

function PopAddOwner({
  onClose,
  setAllOwners,
}: {
  onClose: () => void;
  setAllOwners: React.Dispatch<React.SetStateAction<TypeOwner[]>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { owner } = useOwner();

  async function postAddOwner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;
    const isAdmin = formData.get("isAdmin") === "true";

    console.log("isadmin:", isAdmin);

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if (!owner) return;
    const newOwner = await signIn(owner.id, name, email, password, isAdmin);
    setAllOwners((prev) => [...prev, newOwner]);
    onClose();
  }

  return (
    <PopCard title="Ajouter propriétaire" onClose={() => onClose()}>
      <form
        onSubmit={(e) => postAddOwner(e)}
        className="flex flex-col gap-4 p-4"
      >
        <label htmlFor="name">Nom:</label>
        <input
          className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
          type="text"
          id="name"
          name="name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
          type="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Mot de passe:</label>
        <div className="relative">
          <input
            className="bg-(--color-background) pr-10 w-full rounded-lg p-2"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
          />
          <button
            className="absolute inset-y-0 right-2 flex items-center text-(--color-primary)"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
        <div className="relative">
          <input
            className="bg-(--color-background) pr-10 w-full rounded-lg p-2"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
          />
          <button
            className="absolute inset-y-0 right-2 flex items-center text-(--color-primary)"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <label htmlFor="isAdmin">Status:</label>
        <select
          className="bg-(--color-background) w-full p-2 rounded-lg mx-auto"
          id="isAdmin"
          name="isAdmin"
          defaultValue={"false"}
          required
        >
          <option value="true">Administrateur</option>
          <option value="false">Propriétaire</option>
        </select>

        <ValidBtn type="submit" />
      </form>
    </PopCard>
  );
}

export default PopAddOwner;
