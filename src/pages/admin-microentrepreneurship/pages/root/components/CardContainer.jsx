import NoResults from '@/components/common/NoResults';
import useFetch from '@/hooks/useFetch';
import Card from '@/pages/admin-microentrepreneurship/pages/root/components/Card';
import SkeletonCard from '@/pages/admin-microentrepreneurship/pages/root/components/SkeletonCard';
import { MicroEntrepreneurshipService } from '@/services/micro-entrepreneurship.service';
import { Grid } from '@mui/material';

export default function CardContainer() {
  const microentrepreneurshipService = new MicroEntrepreneurshipService();

  const { data, loading } = useFetch({
    queryFn: ({ abortController }) => microentrepreneurshipService.find({ abortController }),
  });

  if (data?.length === 0) return <NoResults />;

  return (
    <Grid container spacing='1rem' py='2.5rem' mt='0.5rem'>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        : data?.map((microentrepreneurship) => (
            <Card
              key={microentrepreneurship.id}
              // id={microentrepreneurship.id}
              title={microentrepreneurship.name}
              category={microentrepreneurship.category.name}
              microentrepreneurship={microentrepreneurship}
            />
          ))}
    </Grid>
  );
}
