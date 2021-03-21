import React from "react";
import { PageHeader } from "antd";
import logo from '../assets/header_logo.png'

// displays a page header

export default function Header() {
  return (
    <a href="/" target="_blank" rel="noopener noreferrer">
      <PageHeader
        avatar={{ src : logo, shape: "square", size: "large" }}
        title="Composable Collectibles"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
