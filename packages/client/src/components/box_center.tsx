import { Box } from '@mui/material';
import React from 'react';

export default function BoxCenter(props: React.PropsWithChildren): JSX.Element {
  return (
    <Box alignSelf={'center'} paddingLeft={'20%'} paddingRight={'20%'}>
      {props.children}
    </Box>
  );
}
