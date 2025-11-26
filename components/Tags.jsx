"use client"
import { GoContainer } from "react-icons/go";
import { Stack,Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'


const Tags = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
    const GetData = async () =>{
        const res = await fetch('/api/furgones')
        const data = await res.json()
        setdata(data)
    }
    GetData()
    }, [])
    


    const Total_Furgones = data.length;
    const Furgones_Buenos = data.filter(furgon => furgon.estado === 'buena').length;
    const Furgones_Malos = data.filter(furgon => furgon.estado === 'mala').length;

  return (
    <>
        <Stack 
        display={{ xs: 'none', sm: 'none', md: 'flex' }}
        width={"75%"}
        margin={"auto"}
        marginTop={{ xs: '10px', sm: '10px', md: '20px' }}
        padding={{ xs: '10px', sm: '10px', md: '5px' }}
        flexDirection={{xs:"column",sm:"column",md:"row"}}
        gap={{ xs: '10px', sm: '10px', md: '5px' }}
        alignItems={"center"}
        justifyContent={'space-evenly'}
        >
            <Box 
            display={'flex'}
            width={{ xs: '300px', sm: '400px', md: '350px' }}
            gap={{ xs: '10px', sm: '10px', md: '0px' }}
            padding={{ xs: '25px', sm: '10px', md: '40px' }}
            justifyContent={'space-between'}
            flexDirection={"row"}
            alignItems={'center'}
            bgcolor={"white"}
            borderRadius={"5px"}
            boxShadow={2}
            >
                <Box>
                    <Typography variant="h8" color="#474747ab">Total de Unidades</Typography>
                    <Typography variant="h4" marginTop={"5px"}>{Total_Furgones}</Typography>
                </Box>

                <Box bgcolor={"#cce9ffff"} padding={"10px"} borderRadius={"5%"}>
                <GoContainer color="#0270b5ff" size={'45px'}/>
                </Box>
            </Box>

            <Box 
            display={'flex'}
            width={{ xs: '300px', sm: '400px', md: '350px' }}
            gap={{ xs: '10px', sm: '10px', md: '0px' }}
            padding={{ xs: '25px', sm: '10px', md: '40px' }}
            justifyContent={'space-between'}
            flexDirection={"row"}
            alignItems={'center'}
            bgcolor={"white"}
            borderRadius={"5px"}
            boxShadow={2}
            >
                <Box>
                    <Typography variant="h8" color="#474747ab">Unidades Buenas</Typography>
                    <Typography variant="h4" marginTop={'5px'}>{Furgones_Buenos}</Typography>
                </Box>

                <Box bgcolor={"#CCFFE6"} padding={"10px"} borderRadius={"5%"}>
                <GoContainer color="#02B55D" size={'45px'}/>
                </Box>
            </Box>
            <Box 
            display={'flex'}
            width={{ xs: '300px', sm: '400px', md: '350px' }}
            gap={{ xs: '10px', sm: '10px', md: '0px' }}
            padding={{ xs: '25px', sm: '10px', md: '40px' }}
            justifyContent={'space-between'}
            flexDirection={"row"}
            alignItems={'center'}
            bgcolor={"white"}
            borderRadius={"5px"}
            boxShadow={2}
            >
                <Box>
                    <Typography variant="h8" color="#474747ab">Unidades Malas</Typography>
                    <Typography variant="h4" marginTop={'5px'}>{Furgones_Malos}</Typography>
                </Box>

                <Box bgcolor={"#ffd3ccff"} padding={"10px"} borderRadius={"5%"}>
                <GoContainer color="#b50202ff" size={'45px'}/>
                </Box>
            </Box>
        </Stack>
    </>
  )
}

export default Tags