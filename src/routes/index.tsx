import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "../pages/home"
import { QuizzPage } from "../pages/quizz"
import { FeedbackPage } from "../pages/feedback"
import { Provider } from "react-redux"
import { store } from "../library/redux"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/quizz/:id",
        element: <QuizzPage />
    },
    {
        path: "/quizz/:id/feedback",
        element: <FeedbackPage />
    }
])

export const Routes = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}