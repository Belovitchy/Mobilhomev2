import { useState } from "react";
import PopModifMail from "../components/dashboard/PopModifMail";
import PopModifPasseword from "../components/dashboard/PopModifPasseword";
import { useOwner } from "../context/ownerContext";
import PopAddLink from "../components/dashboard/PopAddLink";
import EditBtn from "../components/ui/EditBtn";
import AddBtn from "../components/ui/AddBtn";

function Dashboard() {
  const { owner, setOwner } = useOwner();
  const [popModifMail, setPopModifMail] = useState(false);
  const [popModifPassword, setPopModifPassword] = useState(false);
  const [popAddLink, setPopAddLink] = useState(false);

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
      {popAddLink && owner && owner.id ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddLink id={owner.id} onClose={() => setPopAddLink(false)} />
        </div>
      ) : null}
      {popModifMail && owner && owner.id ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopModifMail
            id={owner.id}
            setOwner={setOwner}
            onClose={() => setPopModifMail(false)}
          />
        </div>
      ) : null}
      <h1 className="text-2xl bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary)">
        Mes infos personnelles
      </h1>
      <section className="mb-8 flex flex-wrap">
        <article className="flex flex-col gap-4 bg-(--color-cards) p-4 rounded-lg  mt-4 w-87.5 mx-auto">
          <div className="flex flex-row justify-between items-center">
            <h2>{owner?.email}</h2>
            <EditBtn
              onClick={() => {
                handleModifMail();
              }}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <h2>Mot de passe</h2>
            <EditBtn
              onClick={() => {
                handleModifPassword();
              }}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <h2>Avatar</h2>
            <EditBtn onClick={() => {}} />
          </div>
        </article>
        <article className="flex flex-col gap-4 bg-(--color-cards) p-4 rounded-lg  mt-4 w-87.5 mx-auto">
          <div className="flex flex-row justify-between items-center">
            <h2>Mes liens</h2>
            <AddBtn
              onClick={() => {
                setPopAddLink(true);
              }}
            />
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
