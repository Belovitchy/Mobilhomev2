import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";
import PopModifMail from "../components/PopModifMail";
import PopModifPasseword from "../components/PopModifPasseword";
import { useOwner } from "../context/ownerContext";

function Dashboard() {
  const { owner } = useOwner();
  const [popModifMail, setPopModifMail] = useState(false);
  const [popModifPassword, setPopModifPassword] = useState(false);

  function handleModifMail() {
    setPopModifMail(true);
  }

  function handleModifPassword() {
    setPopModifPassword(true);
  }

  return (
    <>
      {popModifPassword && owner && owner.id ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopModifPasseword
            id={owner.id}
            onClose={() => setPopModifPassword(false)}
          />
        </div>
      ) : null}
      {popModifMail && owner && owner.id ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopModifMail id={owner.id} onClose={() => setPopModifMail(false)} />
        </div>
      ) : null}
      <h1 className="text-2xl bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary)">
        Mes infos personnelles
      </h1>
      <section className="mb-8 flex flex-wrap">
        <article className="flex flex-col gap-4 bg-(--color-cards) p-4 rounded-lg  mt-4 w-87.5 mx-auto">
          <div className="flex flex-row justify-between items-center">
            <h2>Email</h2>
            <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
              <MdOutlineModeEditOutline
                onClick={() => handleModifMail()}
                className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h2>Mot de passe</h2>
            <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
              <MdOutlineModeEditOutline
                onClick={() => handleModifPassword()}
                className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h2>Avatar</h2>
            <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
              <MdOutlineModeEditOutline className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)" />
            </div>
          </div>
        </article>
        <article className="flex flex-col gap-4 bg-(--color-cards) p-4 rounded-lg  mt-4 w-87.5 mx-auto">
          <div className="flex flex-row justify-between items-center">
            <h2>Mes liens</h2>
            <div className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center">
              <FaPlus className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)" />
            </div>
          </div>
        </article>
      </section>
      <section>
        <h1 className="text-2xl bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary)">
          Les chiffres clés
        </h1>
      </section>
    </>
  );
}

export default Dashboard;
