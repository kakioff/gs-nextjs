export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full sm:max-w-sm sm:shadow dark:shadow-white p-8 rounded-lg backdrop-blur absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4 sm:translate-y-1/3">
        {children}
    </div>
}