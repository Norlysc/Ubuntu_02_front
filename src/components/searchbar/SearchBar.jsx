import SearchBarBase from '@/components/common/SearchBarBase';
import { USER_ROUTES } from '@/constants/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function search(value) {
    const query = value.trim();

    if (!query) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    } else {
      searchParams.set('query', query);

      navigate({
        pathname: USER_ROUTES.SEARCH,
        search: searchParams.toString(),
      });
    }
  }

  return (
    <>
      <SearchBarBase onSubmit={search} />
    </>
  );
}
