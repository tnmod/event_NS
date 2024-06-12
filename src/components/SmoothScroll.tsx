'use client'
import { ReactLenis } from "@studio-freight/react-lenis"
import {PropsWithChildren} from "react";

export const SmoothScroll = ({ children }:PropsWithChildren) => {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}