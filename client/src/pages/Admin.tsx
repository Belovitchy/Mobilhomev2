import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OwnerCard from "../components/OwnerCard";
import PopAddOwner from "../components/admin/PopAddOwner";
import { useOwner } from "../context/ownerContext";
import type { TypeOwner } from "../types/TypeFiles";
import AddBtn from "../components/ui/AddBtn";
import { getOwners } from "../services/adminService";

function Admin() {
  const { owner, isAdmin } = useOwner();
  const [allOwners, setAllOwners] = useState<TypeOwner[]>([]);
  const [popAddOwner, setPopAddOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!owner?.isAdmin || !isAdmin) {
      navigate("/");
      return;
    }
    const getAllOwners = async () => {
      const data = await getOwners();
      setAllOwners(data);
    };
    getAllOwners();
    setAllOwners(allOwners);
    console.log(allOwners);
  }, [owner, navigate, isAdmin]);
  return (
    <>
      {popAddOwner ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <PopAddOwner
            setAllOwners={setAllOwners}
            onClose={() => setPopAddOwner(false)}
          />
        </div>
      ) : null}
      <h1 className="flex flex-row items-center justify-center gap-6  text-2xl bg-(--color-cards) text-(--color-primary) p-4 rounded-lg w-full text-center border-2 border-(--color-primary)">
        Gestion des comptes{" "}
        <AddBtn
          onClick={() => {
            setPopAddOwner(true);
          }}
        />
      </h1>

      <section className="compte flex flex-wrap gap-4 my-4">
        {allOwners.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </section>
    </>
  );
}
export default Admin;
