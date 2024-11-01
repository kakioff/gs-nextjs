export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto mt-20 container max-w-sm shadow dark:shadow-white p-8 rounded-lg backdrop-blur">
        {children}
    </div>
}