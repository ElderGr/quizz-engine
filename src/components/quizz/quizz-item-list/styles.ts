import { w } from "windstitch";

export const Container = w.div(`
    bg-white flex items-center justify-between 
    p-3 rounded cursor-pointer
    hover:bg-gray-50
    gap-4
    w-64
    shadow-md
`)

export const Subtitle = w.span(`
    text-gray-500
`)

export const Title = w.div(`
    font-semibold
`)