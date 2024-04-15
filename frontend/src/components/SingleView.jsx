import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleView({ selectedStudent }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:7000/uploads/student/${selectedStudent.profile}`}
            aria-label="recipe"
          />
        }
        title={selectedStudent.name}
        subheader={selectedStudent.phone}
      />
      <CardMedia
        sx={{ objectFit: "cover", width: "100%", height: "300px" }}
        component="img"
        image={`http://localhost:7000/uploads/student/${selectedStudent.profile}`}
        alt={selectedStudent.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Email :{selectedStudent?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address :{selectedStudent?.address}
        </Typography>
      </CardContent>
    </div>
  );
}
