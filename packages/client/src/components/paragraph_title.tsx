import { Typography } from '@mui/material';

interface ParagraphTitleProps {
  name: string;
}

export default function ParagraphTitle({ name }: ParagraphTitleProps) {
  return (
    <Typography variant="h4" component="div" align="left" gutterBottom>
      {name}
    </Typography>
  );
}
