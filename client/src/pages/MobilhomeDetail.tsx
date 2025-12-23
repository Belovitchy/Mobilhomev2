import { useEffect } from "react";
import { useLocation } from "react-router";

function MobilhomeDetail() {
  const location = useLocation();

  useEffect(() => {
    //recupérer id mobilhome de l'URL
    const mobilhomeId = Number(location.pathname.split("/").pop());
    console.log("Mobilhome ID:", mobilhomeId);
    fetch(
      `${import.meta.env.VITE_API_URL}/api/mobilhome/booking/${mobilhomeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking data:", data);
      });
  }, [location]);

  return (
    <div>
      <h1>Mobilhome Detail Page</h1>
      {/* Additional content can be added here */}
    </div>
  );
}

export default MobilhomeDetail;
