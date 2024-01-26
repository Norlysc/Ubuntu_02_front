import { GeoContext } from '@/contexts/GeoContext';
import { useContext } from 'react';

export default function useGeo() {
  return useContext(GeoContext);
}
