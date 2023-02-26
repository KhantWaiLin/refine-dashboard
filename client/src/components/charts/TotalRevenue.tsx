import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { ArrowCircleUpRounded } from '@mui/icons-material';

import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';

const TotalRevenue = () => {
    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#FCFCFC"
            flexDirection="column"
            borderRadius="15px"
            id="chart"
        >
            <Typography fontWeight={600} fontSize={18} color="#11142d">
                Total Revenue
            </Typography>

            <Stack my="20px" direction="row" gap={4} flexWrap="wrap" >
                <Typography fontSize={28} fontWeight={700} color="#11142d">$236,535</Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <ArrowCircleUpRounded sx={{ color: "#475BE8", fontSize: "25px" }} />
                    <Stack>
                        <Typography color="#475BE8" fontSize={15}>
                            0.8%
                        </Typography>
                        <Typography color="#808191" fontSize={15}>
                            Than last Month
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <ReactApexChart
                options={TotalRevenueOptions}
                series={TotalRevenueSeries}
                type="bar"
                height={310}
            />

        </Box>
    )
}

export default TotalRevenue