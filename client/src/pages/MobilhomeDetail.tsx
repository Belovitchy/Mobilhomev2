import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getMobilhomeDetail } from "../services/mobilhomeService";

function MobilhomeDetail() {
  const [year, setYear] = useState<number>(2026);

  //recupérer id mobilhome de l'URL
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Mobilhome introuvable</div>;
  }

  const mobilhomeId = Number(id);
  if (isNaN(mobilhomeId)) {
    return <Navigate to="/notfound" />;
  }

  useEffect(() => {
    console.log("Mobilhome ID:", mobilhomeId);
    const axiosMobilhomeDetail = async () => {
      const data = await getMobilhomeDetail(mobilhomeId);
      console.log("detail mobilhome:", data);
    };

    axiosMobilhomeDetail();
  }, [mobilhomeId]);

  return (
    <div>
      <h1>Mobilhome Detail Page</h1>
      <input type="number" defaultValue={2026} />
      {/* Additional content can be added here */}
    </div>
  );
}

export default MobilhomeDetail;
