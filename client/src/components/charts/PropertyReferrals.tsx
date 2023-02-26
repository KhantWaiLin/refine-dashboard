import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { propertyReferralsInfo } from 'constants/index';

interface progressBarProps {
  title: string,
  percentage: number,
  color: string,
}

const ProgressBar = ({ title, percentage, color }: progressBarProps) => (
  <Box width="100%">
    <Stack justifyContent="space-between" alignItems="center" direction="row">
      <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}%</Typography>
    </Stack>
    <Box mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef" >
      <Box position="absolute" width={`${percentage}%`} height="100%" borderRadius={1} bgcolor={color} />
    </Box>
  </Box>
)


const PropertyReferralls = () => {
  return (
    <Box
      p={4}
      flexDirection="column"
      flex={0.7}
      id="chart"
      bgcolor="#FCFCFC"
      borderRadius="15px"
    >
      <Typography fontSize="18px" fontWeight={600} color="#11142D">
        Property Referrals
      </Typography>
      <Stack my="20px" gap={4} direction="column">
        {propertyReferralsInfo.map((bar, index) => (
          <ProgressBar
            key={bar.title}
            title={bar.title}
            percentage={bar.percentage}
            color={bar.color} />
        ))}
      </Stack>
    </Box>
  )
}

export default PropertyReferralls