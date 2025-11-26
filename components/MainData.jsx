import { Box } from "@mui/material";
import FormAdd from "./FormAdd";
import DataTable from "./DataTable";
import { prisma } from "@/libs/prisma";

const MainData = async () => {
    const GetData = async () => {
      const data = await prisma.furgon.findMany();
      return data;
    }
    const data = await GetData();
  return (
    <Box 
    width={'90%'}
    margin={'auto'}
    display={'flex'}
    marginTop={'10px'}
    flexDirection={{
        xs: 'column',
        sm: 'column',
        md: 'row'
    }}
    gap={{ xs: '10px', sm: '10px', md: '20px' }}
    padding={{ xs: '5px', sm: '10px', md: '10px' }}
    
    >
    <Box
    width={{sm:"100%",lg:"30%"}}
    >
     <FormAdd/>
    </Box>

    <Box
    width={{sm:"100%",lg:"70%"}}>
        <DataTable Data={data}/>
    </Box>
    
    </Box>
  );
};

export default MainData;
