import test from "@playwright/test";
import PaginaPrincipal from "./page-objects/paginaPrincipal";


test.describe('Buscar Passagem', () => {
    test('Deve buscar passagem de somente ida', async ({page}) => {
        const paginaPrincipal = new PaginaPrincipal(page)

        await paginaPrincipal.visitar()
        await paginaPrincipal.definirSomenteIda()
        await paginaPrincipal.acessarModalPassageiro()
        await paginaPrincipal.definirPassageirosAdultos(3)
        await paginaPrincipal.definirPassageirosCriancas(2)
        await paginaPrincipal.definirPassageirosBebes(2)
        await paginaPrincipal.fecharModalPassageiros()

        await paginaPrincipal.definirOrigemEDestino('Minas Gerais', 'Rio de Janeiro')

        const dataIda = new Date()
        await paginaPrincipal.definirData(dataIda)

        await paginaPrincipal.buscarPassagem()

        await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro', dataIda)
    })
})