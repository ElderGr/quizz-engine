import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>
    },
    {
        path: "/quizz",
        element: <div>Quizz</div>
    },
    {
        path: "/result",
        element: <div>Result</div>
    }
])

export const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}