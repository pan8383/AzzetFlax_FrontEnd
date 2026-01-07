import { getApi } from "@/lib/getApi";
import { useCallback, useEffect, useState } from "react";
import { getLocationsListApiPath } from "./useNavigation";
import { Location, LocationsResponse } from "@/types/api/api";

export function useLocations() {
  const LOCATIONS_LIST_API_PATH = getLocationsListApiPath();
  const [locations, setlocations] = useState<Location[]>([]);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(true);
  const [locationsFetchError, setLocationsFetchError] = useState<boolean>(false);

  const fetchData = useCallback(
    async () => {
      setLocationsLoading(true);
      setLocationsFetchError(false);

      try {
        const res = await getApi<LocationsResponse>(LOCATIONS_LIST_API_PATH);
        setlocations(res.data ?? []);
      } catch (err) {
        setLocationsFetchError(true);
      } finally {
        setLocationsLoading(false);
      }
    }, [LOCATIONS_LIST_API_PATH]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    locations,
    locationsLoading,
    locationsFetchError,
    refetch: fetchData,
  };
}
