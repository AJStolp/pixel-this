import FetchedAllAssets from "../interfaces/fetched-all-assets";

export async function fetchAllImages(): Promise<FetchedAllAssets[]> {
  try {
    const response = await fetch("http://localhost:3001/list-images");
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data: FetchedAllAssets[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
