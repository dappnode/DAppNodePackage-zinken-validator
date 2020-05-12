import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

const sideNavMainItems = [
  { name: "Dashboard", Icon: DashboardIcon },
  { name: "Metrics", Icon: BarChartIcon },
  { name: "Nodes", Icon: LayersIcon },
];

const sideNameSecondaryItems = [
  { name: "Logs", Icon: AssignmentIcon },
  { name: "Support", Icon: PeopleIcon },
];

export const mainListItems = (
  <div>
    {sideNavMainItems.map(({ name, Icon }) => (
      <ListItem key={name} button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    ))}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Help</ListSubheader>
    {sideNameSecondaryItems.map(({ name, Icon }) => (
      <ListItem key={name} button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    ))}
  </div>
);
