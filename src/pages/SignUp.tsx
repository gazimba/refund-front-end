import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        alert("enviado");
    }

    return (
        <>
            <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
                <Input required legend="Nome" placeholder="Fulano de tal" onChange={(e) => setName(e.target.value)} />
                <Input required legend="E-mail" type="email" placeholder="seuemail@exemplo.com" onChange={(e) => setEmail(e.target.value)} />
                <Input required legend="Senha" type="password" placeholder="123456" onChange={(e) => setPassword(e.target.value)} />
                <Input required legend="Confirme sua senha" type="password" placeholder="123456" onChange={(e) => setPasswordConfirm(e.target.value)} />
                <Button type="submit" isLoading={isLoading}>Cadastrar</Button>
                <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já possuo uma conta</a>
            </form>
        </>
    );
}