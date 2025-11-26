import { Paper, Typography } from '@mui/material'
import { SiWikibooks } from "react-icons/si";

const Header = () => {
  return (
    <Paper
    sx={{
        width: '100%', 
        marginBottom: '10px', 
        padding: '10px', 
        backgroundColor: '#1976d2',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        gap: '10px'
        }}>

        <SiWikibooks fontSize={'40px'}/>

        <Typography fontSize={{
            xs: '18px',
            sm: '20px',
            md: '26px'
        }}>Gestión de Unidades Vacias B20</Typography>
    </Paper>
  )
}

export default Header