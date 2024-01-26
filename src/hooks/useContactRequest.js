import { ContactRequestContext } from '@/contexts/ContactRequestContext';
import { useContext } from 'react';

export default function useContactRequest() {
  return useContext(ContactRequestContext);
}
