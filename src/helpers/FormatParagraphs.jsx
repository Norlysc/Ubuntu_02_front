import Paragraph from '@/components/common/Paragraph';

export function FormatParagraphs({ content = '', paragrapStyle = {}, from = 0 }) {
  return content
    .split('\n\n')
    .slice(from)
    .map((paragraph, index) => (
      <Paragraph key={index} isFirst={index === 0} sx={paragrapStyle}>
        {paragraph}
      </Paragraph>
    ));
}
