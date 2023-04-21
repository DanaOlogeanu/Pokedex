import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/Root"
import About from "./routes/About"
import Pokedex from "./routes/Pokedex"
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Pokedex />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)