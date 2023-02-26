import {
    Box,
    Typography,
    Stack,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Select,
    MenuItem,
    Button,
} from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = (
    {
        type,
        register,
        handleSubmit,
        onFinish,
        propertyImage,
        formLoading,
        onFinishHandler,
        handleImageChange }
        : FormProps) => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} Property
            </Typography>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC" >
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter Property Name
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            id="outline-basic"
                            color='info'
                            {...register('title', { required: true })} />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter Description
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            color="info"
                            required
                            placeholder='Write Description'
                            style={{
                                width: "100%",
                                borderColor: 'rgba(20, 39, 80, 0.23)',
                                fontSize: 16,
                                background: "transparent",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191"
                            }}
                            {...register('description', { required: true })}
                        />
                    </FormControl>
                    <Stack direction="row" gap={4}>
                        <FormControl
                            sx={{
                                flex: 1
                            }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Select Propery Type
                            </FormHelperText>
                            <Select
                                variant='outlined'
                                color="info"
                                required
                                displayEmpty
                                inputProps={{
                                    'aria-label': 'Without label'
                                }}
                                defaultValue="apartment"
                                {...register('propertyType', { required: true })}
                            >
                                <MenuItem value="apartment">Apartment</MenuItem>
                                <MenuItem value="villa">Villa</MenuItem>
                                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                                <MenuItem value="condos">Condos</MenuItem>
                                <MenuItem value="townhouse">Townhouse</MenuItem>
                                <MenuItem value="duplex">Duplex</MenuItem>
                                <MenuItem value="studio">Studio</MenuItem>
                                <MenuItem value="chalet">Chalet</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Enter Property Price
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                variant="outlined"
                                id="outline-basic"
                                color='info'
                                {...register('price', { required: true })} />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter location
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            id="outline-basic"
                            color='info'
                            {...register('location', { required: true })} />
                    </FormControl>
                    <Stack direction="column" gap={1}
                        mb={2} justifyContent="center">
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >Property Photo</Typography>
                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    fontSize: 16,
                                    color: "#2ed480",
                                    textTransform: "capitalize"
                                }}>
                                Upload *
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    //@ts-ignore
                                    onChange={(e) => handleImageChange(e.target.files[0])}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {propertyImage?.name}
                        </Typography>
                    </Stack>
                    <CustomButton
                        type='submit'
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#475be8"
                        color="#FCFCFC"
                    />
                </form>
            </Box>
        </Box>
    )
}

export default Form;