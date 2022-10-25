import React, { useState, useEffect, useRef, } from 'react';
import { Outlet } from "react-router-dom";

export const PageLayout = (props) => {


    return (
        <>
            <Outlet />
        </>
    );
}
export default PageLayout