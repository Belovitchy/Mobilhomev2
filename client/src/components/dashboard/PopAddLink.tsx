import PopCard from "../ui/PopCard";
import { addLink } from "../../services/linksService";
import { useOwner } from "../../context/ownerContext";

function PopAddLink({ id, onClose }: { id: number; onClose: () => void }) {
  const { setOwner } = useOwner();

  async function postAddLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const newLink = await addLink(id, name, url);
    console.log(newLink);
    setOwner((prevOwner) => {
      if (!prevOwner) return null;
      return {
        ...prevOwner,
        links: [...prevOwner.links, newLink],
      };
    });

    onClose();
  }

  return (
    <PopCard title="Nouveau lien" onClose={() => onClose()}>
      <form
        onSubmit={(e) => postAddLink(e)}
        className=" flex flex-col gap-4 p-4"
      >
        <label htmlFor="name">Nom :</label>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type="text"
          id="text"
          name="name"
          required
        />
        <label htmlFor="url">Url :</label>
        <input
          className="bg-(--color-background) w-50 p-2 rounded-lg mx-auto"
          type="text"
          id="text"
          name="url"
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

export default PopAddLink;
