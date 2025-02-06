export const getCoordinates = async (
  address: string
): Promise<{ lat: number; lang: number }> => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return { lat: latitude, lang: longitude };
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }

  return { lat: 0, lang: 0 }; // Default values if geocoding fails
};
