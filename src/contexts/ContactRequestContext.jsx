import useFetch from '@/hooks/useFetch';
import { MessageService } from '@/services/message.service';
import { createContext, useEffect, useState } from 'react';

export const ContactRequestContext = createContext();

export default function ContactRequestProvider({ children }) {
  const service = new MessageService();
  const jwt = localStorage.getItem('token');
  const [managed, setManaged] = useState([]);
  const [unmanaged, setUnmanaged] = useState([]);
  let { data, loading } = useFetch({
    queryFn: ({ abortController }) => service.find({ abortController, jwt }),
  });

  useEffect(() => {
    if (data) {
      data?.forEach((e) => {
        if (e.management === 'MANAGED') {
          setManaged((prev) => [...prev, e]);
        } else if (e.management === 'UNMANAGED') {
          setUnmanaged((prev) => [...prev, e]);
        }
      });
    }
  }, [data]);

  return (
    <ContactRequestContext.Provider
      value={{
        managed,
        unmanaged,
        loading,
      }}
    >
      {children}
    </ContactRequestContext.Provider>
  );
}
