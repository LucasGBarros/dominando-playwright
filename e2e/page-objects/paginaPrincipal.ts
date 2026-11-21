import { Page, Locator, expect } from "@playwright/test";

export default class PaginaPrincipal {
    private readonly page: Page
    private readonly campoDropdownOrigem: Locator
    private readonly campoDropdownDestino: Locator;
    private readonly modalPassageiro: Locator;
    private readonly incrementarAdultos: Locator;
    private readonly incrementarCrianca: Locator;
    private readonly incrementarBebes: Locator;
    private readonly fecharModal: Locator;
    private readonly campoDataIda: Locator;
    private readonly botaoIda: Locator;
    private readonly botaoBuscarPassagem: Locator;
    private readonly textoIdaVolta: Locator;
    private readonly containerOrigem: Locator;
    private readonly containerDestino: Locator;
    private readonly botaoComprar: Locator;
    private readonly containerDataIda: Locator;

    
    constructor(page: Page) {
        this.page = page        
        this.botaoIda = page.getByRole('button', {name: 'SOMENTE IDA'})
        this.modalPassageiro = page.getByTestId('abrir-modal-passageiros')
        this.incrementarAdultos = page.getByTestId('seletor-passageiro-adultos').getByRole('button', {name: 'Ícone do operador de adição'})
        this.incrementarCrianca = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'Ícone do operador de adição' })
        this.incrementarBebes = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'Ícone do operador de adição' })
        this.fecharModal = page.getByTestId('fechar-modal-passageiros')
        
        this.campoDropdownOrigem = page
            .getByTestId('campo-dropdown-origem')
            .getByPlaceholder('Origem')

        this.campoDropdownDestino = page
            .getByTestId('campo-dropdown-destino')
            .getByPlaceholder('Destino')

        this.campoDataIda = page.getByTestId('campo-data-ida')

        this.botaoBuscarPassagem = page.getByTestId('botao-buscar-passagens')

        this.textoIdaVolta = page.getByTestId('texto-ida-volta')
        this.containerOrigem = page.getByTestId('container-origem')
        this.containerDestino = page.getByTestId('container-destino')
        this.botaoComprar = page.getByTestId('botao-comprar')
        this.containerDataIda = page.getByTestId('container-data-ida')
    }

    async visitar() {
        await this.page.goto('/')
    }

    async definirSomenteIda() {
        await this.botaoIda.click()
    }

    async acessarModalPassageiro() {
        await this.modalPassageiro.click()
    }
    
    async definirPassageirosAdultos(numeroAdultos: number) {
        for (let i = 1; i < numeroAdultos; i++) { 
            await this.incrementarAdultos.click()
        }
    }

    async definirPassageirosCriancas(numeroCrianca: number) {
        for ( let i = 1; i < numeroCrianca; i++){
            await this.incrementarCrianca.click()  
        }    
    }

    async definirPassageirosBebes(numeroBebes: number) {
        for (let i = 1; i < numeroBebes; i++) {
            await this.incrementarBebes.click()
        }
    }

    async fecharModalPassageiros() {
        await this.fecharModal.click()
    }

    async definirOrigemEDestino(origem: string, destino: string) {
        const textoOrigem = this.page.getByText(origem)
        const textoDestino = this.page.getByText(destino)

        await this.campoDropdownOrigem.fill(origem)
        await this.campoDropdownOrigem.press('Enter')
        await this.campoDropdownDestino.fill(destino)
        await this.campoDropdownDestino.press('Enter')

        await expect(textoOrigem).toBeVisible()
        await expect(textoDestino).toBeVisible()
    }

    async definirData(data: Date) {
        const dataFormatada = data.toLocaleString('en-US', { dateStyle: 'short' })
        await this.campoDataIda.fill(dataFormatada)
    }

    async buscarPassagem() {
        await this.botaoBuscarPassagem.click()
    }

    async estaMostrandoPassagem(tipoTrajeto: 'Somente ida' | 'Ida e volta', origem: string, destino: string, dataIda: Date) {

        const dataIdaFormatada = dataIda.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit' })

        await expect(this.textoIdaVolta).toHaveText(tipoTrajeto)
        await expect(this.containerOrigem).toContainText(origem)
        await expect(this.containerDestino).toContainText(destino)
        await expect(this.containerDataIda).toContainText(dataIdaFormatada)
        await expect(this.botaoComprar).toBeVisible()
    }
}