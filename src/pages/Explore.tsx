import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import { useUser } from "../services/auth/userContext";
import RecommendedListingContainer from "../components/RecommendedListingContainer";
import * as DatabaseService from "../services/firestore";
//import * as Navigation from "../services/navigation";
//import { useRouter } from "next/router";

export default function Explore() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myRecommendedListings, setMyRecommendedListings] = React.useState([]);
  //const router = useRouter();
  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const myRecommendedListingsData = await DatabaseService.setOrGetRecommendationsforStudent(userId);
          if (myRecommendedListingsData) {
            const mRLDAggregated = await Promise.all(
              myRecommendedListingsData.map(async (item) => {
                const listing = await DatabaseService.getListingData(item.employerUid, item.listingId);
                return {
                  score: item.score,
                  employerUid: item.employerUid,
                  listingId: item.listingId,
                  ...listing,
                };
              })
            );
            setMyRecommendedListings(mRLDAggregated);
          }
        } catch (err) {
          console.log(err);
        }
        setLoadingData(false);
      }
    })();
  }, [userId]);

  if (loadingUser || !user) {
    return null;
  }

  if (loadingData) {
    return (
      <LayoutSignedInStudent>
        <div>loading</div>;
      </LayoutSignedInStudent>
    );
  }

  return (
    <LayoutSignedInStudent>
      <div className="flex flex-col justify-start mt-16 ml-96">
        <RecommendedListingContainer items={myRecommendedListings} />
      </div>
    </LayoutSignedInStudent>
  );
}
