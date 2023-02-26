
import { useList } from '@pankod/refine-core';
import { Typography, Stack, Box } from '@pankod/refine-mui';

import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    PropertyCard,
    TopAgent,
} from '../components'

const Home = () => {
    const { isError, isLoading, data } = useList({
        resource: "properties",
        config: {
            pagination: {
                pageSize: 5,
            }
        }
    });

    const allProperties = data?.data ?? [];


    if (isLoading) return <Typography>Loading ...</Typography>
    if (isError) return <Typography>Error ....</Typography>
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Properties for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#475BE8", "#E4E8EF"]} />
                <PieChart
                    title="Properties for Rent"
                    value={550}
                    series={[60, 40]}
                    colors={["#FD8539", "#F2F6FC"]} />
                <PieChart
                    title="Total customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#2ED480", "#F2F6FC"]} />
                <PieChart
                    title="Properties for Cities"
                    value={555}
                    series={[75, 25]}
                    colors={["#FE6D8E", "#F2F6FC"]} />
            </Box>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                mt="25px"
                width="100%"
                gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px"
                    fontWeight={500}
                    color="#11142d"

                >
                    Latest Properties
                </Typography>
                <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {allProperties.map((property, index) => (
                        <PropertyCard
                            key={property.title}
                            id={property._id}
                            photo={property.photo}
                            price={property.price}
                            title={property.title}
                            location={property.location}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home;