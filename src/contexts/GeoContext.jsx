/* eslint-disable react-hooks/exhaustive-deps */
import { GeoService } from '@/services/geo.repository';
import { createContext, useEffect, useState } from 'react';

export const GeoContext = createContext();

export default function GeoProvider({ children }) {
  const geoInstance = new GeoService();
  const [countries, setCountries] = useState();
  const [provinces, setProvinces] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function changeCountry(country) {
    setCurrentCountry(country);
  }

  async function getCountries({ abortController }) {
    try {
      const countries = await geoInstance.findCountries({ abortController });

      setCountries(countries);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getProvinces({ abortController }) {
    try {
      const countries = await geoInstance.findProvinces({
        abortController,
        country: currentCountry,
      });

      setProvinces(countries);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    getCountries({ abortController });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (!currentCountry) return;
    const abortController = new AbortController();
    getProvinces({ abortController });

    return () => abortController.abort();
  }, [currentCountry]);

  return (
    <GeoContext.Provider
      value={{
        countries,
        provinces,
        currentCountry,
        changeCountry,
        loading,
        error,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}
