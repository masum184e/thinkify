import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { IoSchoolSharp } from "react-icons/io5";
import { BiSolidInstitution } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
const plans = [
  {
    title: "Student",
    price: "Free",
    features: [
      "All features in Basic",
      "Course creation",
      "Analytics dashboard",
    ],
    icon: <PiStudentBold fontSize="60px" />,
    color: "linear-gradient(to right, #1b2e35, #1b2e35)",
  },
  {
    title: "Teacher",
    price: "$55/month",
    features: [
      "All features in Standard",
      "Advanced analytics",
      "Dedicated support",
    ],
    icon: <IoSchoolSharp fontSize="60px" />,
    color: "linear-gradient(to right, #1b2e35, #59e3a7)",
  },
  {
    title: "Business",
    price: "$199/month",
    features: [
      "All features in Premium",
      "Unlimited users",
      "Custom integrations",
    ],
    icon: <BiSolidInstitution fontSize="60px" />,
    color: "linear-gradient(to right, #59e3a7, #59e3a7)",
  },
];

const Subscription = () => {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2, mb: 6 }}>
      {plans.map((plan, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              textAlign: "center",
              borderRadius: "16px",
              boxShadow: 3,
              p: 2,
              background: plan.color,
              color: "#fff",
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mx: "auto",
                bgcolor: "transparent",
              }}
            >
              {plan.icon}
            </Avatar>
            <CardHeader
              title={plan.title}
              titleTypographyProps={{
                variant: "h6",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {plan.price}
              </Typography>
              <ul
                style={{
                  listStyle: "none",
                  textAlign: "left",
                }}
              >
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Typography variant="body1">✔ {feature}</Typography>
                  </li>
                ))}
              </ul>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#fff",
                  color: "#1b2e35",
                  fontWeight: "bold",
                  borderRadius: "100px",
                  "&:hover":{
                    bgcolor:"#fff"
                  }
                }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Subscription;
