import type { TypeLink } from "../../types/TypeFiles";
import PopCard from "../ui/PopCard";
import { modifLink } from "../../services/linksService";
import { useOwner } from "../../context/ownerContext";
import ValidBtn from "../ui/ValidBtn";

function PopModifLink({
  link,
  id,
  onClose,
}: {
  link: TypeLink | null;
  id: number;
  onClose: () => void;
}) {
  const { setOwner } = useOwner();

  async function postModifLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const updateLink = await modifLink(id, link!.id, name, url);
    console.log(modifLink);
    setOwner((prevOwner) => {
      if (!prevOwner) return null;
      return {
        ...prevOwner,
        links: prevOwner.links.map((l) => (l.id === link!.id ? updateLink : l)),
      };
    });

    onClose();
  }

  return (
    <PopCard title={`Modifier ${link?.name} ?`} onClose={() => onClose()}>
      <form
        onSubmit={(e) => postModifLink(e)}
        className=" flex flex-col gap-4 p-4"
      >
        <label htmlFor="name">Nom :</label>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type="text"
          id="text"
          name="name"
          defaultValue={link?.name}
          required
        />
        <label htmlFor="url">Url :</label>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type="text"
          id="text"
          name="url"
          defaultValue={link?.url}
          required
        />

        <ValidBtn type="submit" />
      </form>
    </PopCard>
  );
}

export default PopModifLink;
