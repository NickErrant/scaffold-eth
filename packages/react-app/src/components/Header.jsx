import React from "react";
import { PageHeader } from "antd";
import logo from '../assets/favicon.png'

// displays a page header

export default function Header() {
  return (
    <a href="/" target="_blank" rel="noopener noreferrer">
      <PageHeader
        avatar={{ src : logo, shape: "square", size: "large" }}
        title=" "
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
