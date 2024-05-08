import { Box, Typography } from "@mui/material";

const PreviewProduct = () => {
    return (
        <Box sx={{ marginX: 2 }}>
            <Typography variant="h2" sx={{ fontSize: "30px", fontWeight: "thin", color: "#8db4a3" }}>Preview</Typography>
            <Box sx={{
                padding: "5px 0px",
            }}>
                <Typography variant="h1" sx={{ fontSize: "40px", fontWeight: "700", color: "#1b2e35" }}>Amazfit Pop 3S</Typography>
                <img style={{
                    border: "1px solid lightgray",
                    borderRadius: "5px"
                }} width="100%" src="/images/banner.jpg" alt="" />
                <Typography variant="h3" sx={{ fontSize: "30px", color: "#1b2e35" }}>Price: <span style={{ fontWeight: "bold", color: "#1b2e35" }}>$60</span></Typography>
                <Typography variant="body1" sx={{ color: "#797979", textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis hic
                    in qui error id fuga consectetur autem dicta provident quidem
                    temporibus delectus debitis, velit veniam mollitia eveniet eaque esse
                    corporis!
                </Typography>
            </Box>
        </Box>
    )
}

export default PreviewProduct