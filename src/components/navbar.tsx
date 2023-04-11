import {AppBar, Toolbar, Box, Typography} from "@mui/material"

const NavBar = () => {
    return (
    <Box flexGrow={1}>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant="h6" sx={{textAlign: "center"}} flexGrow={1}>
                    App
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default NavBar