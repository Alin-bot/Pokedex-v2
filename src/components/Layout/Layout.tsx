import React, { PropsWithChildren } from "react";

import "./Layout.css";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="wrapper">
      <div className="content-wrapper">{children}</div>
    </div>
  );
}

export default Layout;
