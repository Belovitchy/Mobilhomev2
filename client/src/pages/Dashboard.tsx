import { useState } from "react";
import PopModifMail from "../components/dashboard/PopModifMail";
import PopModifPasseword from "../components/dashboard/PopModifPasseword";
import { useOwner } from "../context/ownerContext";
import PopAddLink from "../components/dashboard/PopAddLink";
import EditBtn from "../components/ui/EditBtn";
import AddBtn from "../components/ui/AddBtn";
import DeleteBtn from "../components/ui/DeleteBtn";
import PopDeleteLink from "../components/dashboard/PopDeleteLink";
import type { TypeLink } from "../types/TypeFiles";
import PopModifLink from "../components/dashboard/PopModifLink";

function Dashboard() {
  const { owner, setOwner } = useOwner();
  const [popModifMail, setPopModifMail] = useState(false);
  const [popModifPassword, setPopModifPassword] = useState(false);
  const [popAddLink, setPopAddLink] = useState(false);
  const [popDeleteLink, setPopDeleteLink] = useState(false);
  const [link, setLink] = useState<TypeLink | null>(null);
  const [popModifLink, setPopModifLink] = useState(false);

  function handleModifMail() {
    setPopModifMail(true);
  }

  function handleModifPassword() {
    setPopModifPassword(true);
  }

  function handleDeleteLink(link: TypeLink) {
    setLink(link);
    setPopDeleteLink(true);
  }

  function handleModifLink(link: TypeLink) {
    setLink(link);
    setPopModifLink(true);
  }

  return (
    <>
      {popModifLink && owner && owner.id ? (
        <PopModifLink
          link={link}
          id={owner.id}
          onClose={() => setPopModifLink(false)}
        />
      ) : null}
      {popDeleteLink && owner && owner.id ? (
        <PopDeleteLink
          link={link}
          id={owner.id}
          onClose={() => setPopDeleteLink(false)}
        />
      ) : null}
      {popModifPassword && owner && owner.id ? (
        <PopModifPasseword
          id={owner.id}
          onClose={() => setPopModifPassword(false)}
        />
      ) : null}
      {popAddLink && owner && owner.id ? (
        <PopAddLink id={owner.id} onClose={() => setPopAddLink(false)} />
      ) : null}
      {popModifMail && owner && owner.id ? (
        <PopModifMail
          id={owner.id}
          setOwner={setOwner}
          onClose={() => setPopModifMail(false)}
        />
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
          {owner?.links.map((link) => (
            <div
              className="flex flex-row justify-between items-center"
              key={link.id}
            >
              <a
                className="underline lg:no-underline lg:hover:underline lg:hover:text-(--color-primary) transition-all"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
              <div className="flex flex-row gap-2">
                <EditBtn onClick={() => handleModifLink(link)} />
                <DeleteBtn onClick={() => handleDeleteLink(link)} />
              </div>
            </div>
          ))}
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
