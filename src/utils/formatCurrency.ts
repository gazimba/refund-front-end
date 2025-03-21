export function formatCurrency(value: number) {
    const currecy = Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    })
    return currecy.format(value).replace("R$", "");
}