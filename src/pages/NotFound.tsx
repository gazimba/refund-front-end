export function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center font-bold" >
            <h1 className="text-gray-100 font-semibold text-4xl mb-6">404 - Essa página não existe</h1>
            <a href="/" className="font-semibold text-center text-green-100 hover:text-green-200 transition ease-linear ">Voltar para o início</a>
        </div>
    )
}