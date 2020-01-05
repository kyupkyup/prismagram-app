import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({ name, color = styles.blackColor, size=26, focused=true}) => (
  <Ionicons name={name} color={focused ? color: styles.lightGreyColor} size={size} />
);

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
}


export default NavIcon;