import React from "react";

const MaxWidth = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  return <div className="lg:w-11/12 w-11/12 mx-auto">{children}</div>;
};

export default MaxWidth;
