export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <div className="flex flex-col justify-center items-center space-y-10">
             <header className="p-5 w-screen flex items-center justify-between text-black bg-gradient-to-r from-[#f4978e] to-[#f08080]">
            <div>Logo</div>
            </header>
            {children}
        </div>
    )
}