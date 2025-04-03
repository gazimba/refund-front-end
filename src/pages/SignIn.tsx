import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
    const [state, formAction] = useActionState()

    function onAction(formData: FormData) {
      
    }

    return (
        <>
            <form action={onAction} className="w-full flex flex-col gap-4">
                <Input name="email" required legend="E-mail" type="email" placeholder="seuemail@exemplo.com" />
                <Input name="password" required legend="Senha" type="password" placeholder="123456" />
                <Button type="submit" isLoading={isLoading}>Entrar</Button>
                <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
            </form>
        </>
    );
}