import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useOwner } from "../context/ownerContext";
import { logout, login, saveToken } from "../services/authService";
import ValidBtn from "../components/ui/ValidBtn";
import PopCard from "../components/ui/PopCard";

function Accueil() {
  const { setOwner, setIsConnected, isConnected } = useOwner();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const data = await login(email, password);
      console.log(data.owner);
      saveToken(data.token);
      setOwner(data.owner);
      setIsConnected(true);
      navigate("/dashboard");
    } catch {
      alert("Email ou mot de passe incorrect");
    }
  };

  function handleLogout() {
    logout();
    setOwner(null);
    setIsConnected(false);
    navigate("/");
  }

  return (
    <>
      {!isConnected ? (
        <form
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-85 bg-(--color-cards)  mx-auto p-4 border-2 border-(--color-primary) rounded-2xl flex flex-col gap-8 mt-16"
          onSubmit={(e) => handleLogin(e)}
        >
          <h1 className="text-2xl font-bold m-auto">Identification</h1>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-(--color-background) w-50 p-2 rounded-lg"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                className="bg-(--color-background) pr-10 w-50 rounded-lg p-2"
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
          </div>
          <ValidBtn type="submit" />
        </form>
      ) : (
        <PopCard title="Se déconnecter" onClose={() => navigate("/dashboard")}>
          <form
            className="flex flex-col gap-4 "
            onSubmit={() => handleLogout()}
          >
            <ValidBtn type="submit" />
          </form>
        </PopCard>
      )}
    </>
  );
}

export default Accueil;
