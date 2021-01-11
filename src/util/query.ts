import * as db from "../services/firestore/index";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getSearchResult(searchKeyWord: string) {
  return await db.getAllListings();
}
