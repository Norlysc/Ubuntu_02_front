import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { FormatParagraphs } from '@/helpers/FormatParagraphs';
import CardContainer from '@/components/card/CardContainer';
import CardContent from '@/components/card/CardContent';
import CardImageSlider from '@/components/card/CardImageSlider';
import CardToggle from '@/components/card/CardToggle';
import ButtonWithMenu from '@/components/common/ButtonWithMenu';
import { ADMIN_ROUTES } from '@/constants/routes';
import instance from '@/helpers/axiosConfig';
import { useNavigate } from 'react-router-dom';
import NoticeCard from '@/components/common/NoticeCard';

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hidded, setHidded] = useState(false);
  const { mixins } = useTheme();
  const headerText = post.description;

  const sx = isExpanded ? mixins.cardExpanded : mixins.cardCollapsed;

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  const receivedDate = post.creationDate;
  const date = new Date(receivedDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formatedDate = `${day}/${month}/${year}`;

  const jwt = localStorage.getItem('token');

  const hidePublicationHandler = async (id) => {
    const url = `/publication/change-status/${id}`;

    try {
      const response = await instance.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
    } catch (error) {
      console.error('Error hiding publication:', error);
    } finally {
      setHidded(true);
    }
  };

  return (
    <CardContainer>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h3'>{post.title}</Typography>
        {hidded && (
          <NoticeCard
            isOpen={true}
            success={true}
            handleClose={() => {
              navigate('..');
            }}
            mainMessage='Publicación ocultada con éxito a visitantes'
            cancelFunction={() => {
              navigate('..');
            }}
            reload
          />
        )}

        <ButtonWithMenu
          editRoute={ADMIN_ROUTES.POSTS.EDIT}
          onHidden={() => {
            hidePublicationHandler(post.id);
          }}
          storedState={post}
        />
      </Box>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        <Box>
          <CardImageSlider images={post.images} />
        </Box>
        <Box display='flex' flexDirection='column' gap='0.5rem'>
          <CardContent
            header={Header({ date: formatedDate, text: headerText, sx })}
            content={FormatParagraphs({ content: post.content, from: 1 })}
            isExpanded={isExpanded}
          />
          <CardToggle isExpanded={isExpanded} onClick={handleClick} renderButton={Button} />
        </Box>
      </Box>
    </CardContainer>
  );
}

function Header({ date, text, sx }) {
  return (
    <Box display='flex' flexDirection='column' gap='0.25rem'>
      <Typography variant='body2' component='span' sx={{ fontWeight: 600 }}>
        {date}
      </Typography>
      <Typography component='p' variant='body1' sx={sx}>
        {text}
      </Typography>
    </Box>
  );
}

function Button(isExpanded) {
  return isExpanded ? (
    <Typography variant='body1' component='span'>
      Ver menos
    </Typography>
  ) : (
    <Typography variant='body1' component='span'>
      Ver más
    </Typography>
  );
}
