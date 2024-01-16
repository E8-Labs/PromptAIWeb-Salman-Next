import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';

const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: 'a week ago',
  },
  {
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Queen - Greatest Hits',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '3 years ago',
  },
  {
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '10 months ago',
  },
];

function LoadingView(props) {
//   const { loading = true } = props;

  return (
    <Grid container wrap="nowrap" >
      {(Array.from(new Array(3))).map((item, index) => (
        <Box key={index} sx={{ width: 260, marginRight: 0.5, my: 5, backgroundColor: '#001812', borderRadius: 2}}>
            {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
            <Stack direction={'row'}>
                <Skeleton sx={{bgcolor: 'grey.400'}} variant="circular" width={40} height={40} />
                <Skeleton sx={{bgcolor: 'transparent'}} variant="rectangular" width={10} height={40} />
                <Stack>
                    <Skeleton sx={{bgcolor: 'grey.400'}} variant="rectangular" width={210} height={25} />
                    <Skeleton sx={{bgcolor: 'transparent'}} variant="rectangular" width={210} height={10} />
                    <Skeleton sx={{bgcolor: 'grey.400'}} variant="rectangular" width={210} height={25} />
                </Stack>
            </Stack>
            <Skeleton sx={{bgcolor: 'transparent'}} variant="rectangular" width={260} height={10} />
            <Skeleton sx={{bgcolor: 'grey.400'}} variant="rectangular" width={260} height={60} />
            <Skeleton sx={{bgcolor: 'transparent'}} variant="rectangular" width={260} height={10} />
            <Skeleton sx={{bgcolor: 'grey.400'}} variant="rounded" width={260} height={120} />
        </Box>
      ))}
    </Grid>
  );
}



export default function YouTubeLikeLoading() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <LoadingView loading={true} />
      {/* <LoadingView /> */}
    </Box>
  );
}