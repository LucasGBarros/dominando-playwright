import { expect, Locator, Page } from "@playwright/test"
import { test as base } from "@playwright/test"

export const test = base.extend<{ paginaLogin: PaginaLogin }> ({
    paginaLogin: async ({ page }, use) => {
        const paginaLogin = new PaginaLogin(page)
        await paginaLogin.visitar()
        await use(paginaLogin)
    }
})

/**
 * PaginaLogin = "controle remoto" da tela de login.
 * Ele não é a aba do navegador: ele RECEBE a aba e sabe como usá-la.
 *
 * Analogia rápida:
 * - page         → a ABA do navegador
 * - botaoLogin   → botão "LOGIN" no header
 * - inputEmail   → campo de e-mail do formulário
 * - inputSenha   → campo de senha do formulário
 * - acessarConta → botão "ACESSAR MINHA CONTA"
 */
export default class PaginaLogin {
    // page = a ABA do navegador (controle do Playwright sobre a tela aberta)
    private readonly page: Page

    // Elementos específicos DENTRO da aba
    private readonly botaoLogin: Locator
    private readonly inputEmail: Locator
    private readonly inputSenha: Locator
    private readonly acessarConta: Locator

    // Ao criar new PaginaLogin(page), o Playwright entrega a aba aqui
    constructor(page: Page) {
        // Guarda a aba inteira para usar depois nos métodos
        this.page = page

        // "Marca" cada elemento pelo data-testid para reutilizar depois
        this.botaoLogin = page.getByTestId('botao-login')
        this.inputEmail = page.getByTestId('input-email')
        this.inputSenha = page.getByTestId('input-senha')
        this.acessarConta = page.getByTestId('botao-acessar-conta')
    }

    // visitar() = abre o site e chega até a tela de login
    async visitar() {
        // 1) Usa a ABA para ir até a home
        await this.page.goto('/')

        // 2) Clica no botão LOGIN do header
        await this.botaoLogin.click()

        // 3) Confere se a ABA foi para a URL de login
        await expect(this.page).toHaveURL('/auth/login')
    }

    // fazerLogin() = preenche o formulário e tenta entrar
    async fazerLogin(email: string, senha: string) {
        // Digita e-mail e senha nos campos guardados
        await this.inputEmail.fill(email)
        await this.inputSenha.fill(senha)

        // Clica em "ACESSAR MINHA CONTA"
        await this.acessarConta.click()
    }

    // loginFeitoComSucesso() = valida que o login redirecionou para a home
    async loginFeitoComSucesso() {
        // Depois do login, a app deve ir para /home
        await expect(this.page).toHaveURL('/home')
    }

    async erroLogin(mensagem: string) {
        const elementoErro = this.page.getByText(mensagem)
        await expect(elementoErro).toBeVisible()
    }

    async errorFormulario(email: string, senha: string, mensagem: string, mensagem2: string) {
        const emailError = this.page.getByText(mensagem)
        const senhaError = this.page.getByText(mensagem2)
        await this.inputEmail.fill(email)
        await this.inputSenha.fill(senha)
        await this.inputSenha.blur()
        await expect(emailError).toBeVisible()
        await expect(senhaError).toBeVisible()
    }
}
