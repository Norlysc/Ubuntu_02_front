import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { FormatParagraphs } from '@/helpers/FormatParagraphs';
import CardContainer from '@/components/card/CardContainer';
import CardContent from '@/components/card/CardContent';
import CardImageSlider from '@/components/card/CardImageSlider';
import CardToggle from '@/components/card/CardToggle';
import { PublicationService } from '@/services/publication.service';

export default function PostCard({ post }) {
  const service = new PublicationService();
  const [isExpanded, setIsExpanded] = useState(false);
  const { mixins } = useTheme();
  const headerText = post.description.split('\n\n')[0];
  // esto agregar al final de headerText
  // .split('\n\n')[0];

  const sx = isExpanded ? mixins.cardExpanded : mixins.cardCollapsed;

  async function handleClick() {
    if (!isExpanded) await service.findOne({ id: post.id, abortController: new AbortController() });
    setIsExpanded(!isExpanded);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const imgObj = post?.images?.map((img) => ({ url: img }));

  return (
    <CardContainer>
      <Typography variant='h3' align='center'>
        {post.title}
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        <Box>
          <CardImageSlider images={imgObj} />
        </Box>
        <Box display='flex' flexDirection='column' gap='0.5rem'>
          <CardContent
            header={Header({ date: formatDate(post.creationDate), text: headerText, sx })}
            content={FormatParagraphs({ content: post.description, from: 1 })}
            isExpanded={isExpanded}
            sx={{ flex: 1 }}
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
