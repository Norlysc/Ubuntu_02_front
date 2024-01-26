import NoticeCard from '@/components/common/NoticeCard';
import { CONTACT_REQUEST_STATE } from '@/constants/contact-request-states';
import { useBoolean } from '@/hooks/useBoolean';
import useFetch from '@/hooks/useFetch';
import ManageForm from '@/pages/admin-request/pages/manage/components/ManageForm';
import { MessageService } from '@/services/message.service';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Manage() {
  const { id } = useParams();
  const [manage, setManage] = useState('');
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');
  const [secondaryMessage, setSecondaryMessage] = useState('');
  const { palette } = useTheme();
  const { value, setFalse, toggle } = useBoolean(false);

  const service = new MessageService();
  const jwt = localStorage.getItem('token');
  const { data, loading } = useFetch({
    queryFn: ({ abortController }) => service.findOne({ id, abortController, jwt }),
  });

  const handleChange = async (event) => {
    setManage(event.target.value);

    try {
      await service.update({ id, abortController: new AbortController(), jwt });
      toggle();
      setSuccess(true);
      setMessage('Estado modificado con éxito');
    } catch (error) {
      setSuccess(false);
      setMessage('Lo sentimos, el Estado no pudo ser modificado.');
      setSecondaryMessage('Por favor, volvé a intentarlo.');
      setManage('');
    }
  };

  if (loading)
    return (
      <Grid>
        <Box
          display={'flex'}
          gap={'0.25rem'}
          mt={'1.5rem'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'0.5rem'}>
            <Skeleton variant='rounded' width={'10rem'} height={'1.5rem'} />
          </Box>
          <Box mt='1rem' justifyContent={'flex-end'} display={'flex'} sx={{ width: '100%' }}>
            <Skeleton variant='rounded' width={'9.5rem'} height={'3.5rem'} sx={{ mt: '1rem' }} />
          </Box>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          mt={'1rem'}
        >
          <Skeleton variant='rounded' width={'8rem'} height={'1.5625rem'} />
          <Skeleton variant='rounded' width={'13rem'} height={'1.25rem'} sx={{ mt: '1rem' }} />
        </Box>
        <Box display={'flex'} flexDirection={'column'} mb={'2.5rem'} gap={'1rem'} mt={'1.5rem'}>
          <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
          <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
          <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
          <Skeleton variant='rounded' width={'100%'} height={'13.5rem'} />
        </Box>
      </Grid>
    );

  return (
    <Grid>
      <Box
        display={'flex'}
        gap={'0.25rem'}
        mt={'1.5rem'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'0.5rem'}>
          <Box
            sx={{
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              bgcolor:
                data.management === CONTACT_REQUEST_STATE.MANAGED ? 'success.main' : 'warning.main',
            }}
          ></Box>
          <Typography variant='h3'>No Gestionada</Typography>
        </Box>
        <Box mt='1rem' justifyContent={'flex-end'} display={'flex'} sx={{ width: '100%' }}>
          {data.management === CONTACT_REQUEST_STATE.UNMANAGED && (
            <FormControl variant='filled' sx={{ m: 1, width: '9.5rem' }}>
              <InputLabel id='demo-simple-select-filled-label'>Estado</InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={manage}
                onChange={handleChange}
                MenuProps={{
                  MenuListProps: { sx: { padding: 0 } },
                }}
              >
                <MenuItem value={'gestionada'}>
                  <Box display={'flex'}>
                    <Box
                      sx={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        mr: '0.5rem',
                      }}
                    ></Box>
                    <Typography variant='body1'>Gestionada</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
      <Typography
        fontWeight={800}
        mt={'1rem'}
        textAlign={'center'}
        color={palette.primary.main}
        variant='h2'
      >
        {data.microentrepreneurship.name}
      </Typography>
      <Typography mt={'1rem'} textAlign={'center'}>
        Fecha de solicitud: {data.sentDate}
      </Typography>
      <ManageForm {...data} />
      <NoticeCard
        isOpen={value}
        success={success}
        handleClose={setFalse}
        cancelFunction={setFalse}
        mainMessage={message}
        secondaryMessage={secondaryMessage}
        reload
      />
    </Grid>
  );
}
