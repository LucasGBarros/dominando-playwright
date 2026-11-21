import { test } from "./page-objects/paginaLogin"

test.describe('Página de Login', () => {
    test("Deve conseguir efetuar login com email e senha válidos", async ({ paginaLogin }) => {
        await paginaLogin.fazerLogin('lucas.gomes@gmail.com', '123Mudar!')
        await paginaLogin.loginFeitoComSucesso()
    })

    test("Login com erro de email inválido", async ({ paginaLogin }) => {
        await paginaLogin.fazerLogin('lucas.errado@gmail.com', '123Mudar!')
        await paginaLogin.erroLogin('E-mail ou senha inválidos')
    }) 

    test("Email e senha obrigatória", async ({ paginaLogin }) => {
        await paginaLogin.errorFormulario('lucas.errado.gmail.com', '', 'E-mail inválido', 'Senha é obrigatória')
    })
})