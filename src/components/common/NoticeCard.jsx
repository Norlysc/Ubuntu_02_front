import { useNavigate } from 'react-router-dom';
import { Typography, Card, Modal, Box, Button, Fade } from '@mui/material';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

const NoticeCard = ({
  isOpen,
  handleClose,
  success,
  mainMessage,
  secondaryMessage,
  cancelFunction,
  reload = false,
  goBack = false,
}) => {
  const navigate = useNavigate();
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={isOpen}>
        <Card
          sx={{
            width: '360px',
            borderRadius: '25px',
            textAlign: 'center',
            padding: '1rem 1.25rem 0.25rem',
            paddingBottom: '1px',
            outline: 'none',
          }}
        >
          {success ? (
            <Box sx={{ color: '#1D9129', fontSize: '45px' }}>
              <CheckCircleOutline fontSize='inherit' />
            </Box>
          ) : (
            <Box sx={{ color: '#BC1111', fontSize: '45px' }}>
              <CancelOutlined fontSize='inherit' />
            </Box>
          )}
          <Box mt='1rem'>
            <Typography variant='h3' sx={{ fontWeight: 400, lineHeight: '2rem' }}>
              {mainMessage}
            </Typography>
          </Box>
          {secondaryMessage && (
            <Box mt='1rem'>
              <Typography variant='body1' textAlign='left'>
                {secondaryMessage}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: '0.25rem' }}>
            {!success ? (
              <>
                <Button sx={{ textTransform: 'none' }} onClick={handleClose}>
                  Cancelar
                </Button>
                <Button sx={{ textTransform: 'none' }} onClick={cancelFunction}>
                  Intentar nuevamente
                </Button>
              </>
            ) : (
              <Button
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  handleClose();

                  if (reload) location.reload();
                  if (goBack) navigate('..');
                }}
              >
                Aceptar
              </Button>
            )}
          </Box>
        </Card>
      </Fade>
    </Modal>
  );
};
export default NoticeCard;
