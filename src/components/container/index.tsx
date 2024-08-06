export function Container ({ children }: React.PropsWithChildren) {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    )
}