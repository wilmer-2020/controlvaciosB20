import { Box } from "@mui/material";
import FormAdd from "./FormAdd";
import DataTable from "./DataTable";
import { prisma } from "@/libs/prisma";

// 🚨 OBLIGATORIO: Esto fuerza a que se consulten datos nuevos siempre
export const dynamic = 'force-dynamic';

const MainData = async () => {
  const GetData = async () => {
    // No hace falta try/catch complejo aquí, Next.js maneja errores de servidor
    const data = await prisma.furgon.findMany({
        orderBy: { createdAt: 'desc' } // Ordenar por más reciente
    });
    return data;
  }
  
  const data = await GetData();

  return (
    <Box 
      width={'90%'} margin={'auto'} display={'flex'} marginTop={'10px'}
      flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
      gap={{ xs: '10px', sm: '10px', md: '20px' }}
      padding={{ xs: '5px', sm: '10px', md: '10px' }}
    >
      <Box width={{sm:"100%", lg:"30%"}}>
         {/* Ya no pasamos props de refresco porque usaremos router.refresh() dentro */}
         <FormAdd/>
      </Box>

      <Box width={{sm:"100%", lg:"70%"}}>
         {/* DataTable recibe la data inicial del servidor */}
         <DataTable Data={data}/>
      </Box>
    </Box>
  );
};

export default MainData;