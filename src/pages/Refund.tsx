import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { set, z, ZodError } from "zod";

import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

import fileSvg from "../assets/file.svg"
import { AxiosError } from "axios";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
    name: z.string().min(3, { message: "Informe um nome adequado" }),
    category: z.string().min(1, { message: "Selecione uma categoria" }),
    amount: z.coerce.number({ message: "Informe um valor válido" }).positive({ message: "Informe um valor positivo" }),
})

export function Refund() {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);

    const navigate = useNavigate();
    const params = useParams<{ id: string }>()

    async function onSubmit(e: FormEvent) {
        e.preventDefault();


        if (params.id) {
            return navigate(-1)
        }

        try {
            setIsLoading(true);
            if (!file) {
                return alert("Selecione um comprovante")
            }

            const fileUploadForm = new FormData();
            fileUploadForm.append("file", file);

            const response = await api.post("/uploads", fileUploadForm)

            const data = refundSchema.parse({
                name,
                category,
                amount: amount.replace(",", "."),
            })
            await api.post("/refunds", {
                ...data,
                filename: response.data.filename
            })
            navigate("/confirm", { state: { fromSubmit: true } });
        } catch (error) {
            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }
            alert("Erro ao enviar a solicitação, tente novamente mais tarde.")
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchRefund(id: string) {
        try {
            const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)
            setName(data.name)
            setCategory(data.category)
            setAmount(formatCurrency(data.amount))
            setFileURL(data.filename)
        } catch (error) {
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }
            alert("Erro ao buscar a solicitação, tente novamente mais tarde.")
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchRefund(params.id)
        }
    }, [params.id])

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
            <header>
                <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
            </header>

            <Input required legend="Nome da solicitação" onChange={e => setName(e.target.value)} value={name} disabled={!!params.id} />

            <div className="flex gap-4">
                <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
                    {
                        CATEGORIES_KEYS.map((category) => (
                            <option key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>

                <Input legend="valor" required value={amount} onChange={e => setAmount(e.target.value)} disabled={!!params.id} />
            </div>

            {
                (params.id && fileURL) ? (
                    <a href={`http://localhost/uploads/${fileURL}`} target="_blank" className="text-sm text-green-100font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
                        <img src={fileSvg} alt="ícone do arquivo" />
                        Abrir comprovante
                    </a>
                ) : (
                    <Upload legend="Comprovante" filename={file && file.name} onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                )
            }

            <Button type="submit" isLoading={isLoading}>
                {
                    params.id ? "Voltar" : "Enviar"
                }
            </Button>
        </form>
    )
}