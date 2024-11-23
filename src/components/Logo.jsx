import React from "react";

function Logo({ iscollapsed }) {
  return (
    <>
      {iscollapsed ? (
        <img className="logo" src="/wow_images/logo@2x-1.png" alt="wow" />
      ) : (
        <img className="logo" src="wow_logo/logo.png" alt="wow" />
      )}
    </>
  );
}

export default Logo;
