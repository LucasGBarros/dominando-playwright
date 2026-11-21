import test, { expect } from "@playwright/test";

test.describe("Página Inicial", () => {
    test("Deve visitar a página inicial", async ({ page }) => {
        await page.goto("/") // ação
        await expect(page).toHaveTitle("Jornada Milhas") // asseção


        // const tituloPassagens = page.getByRole('heading', { name: 'Passagens'})
        const tituloPassagens = page.getByTestId('titulo-passagens')
        const tituloPromocoes = page.getByTestId('titulo-promocoes')
        const tituloDepoimentos = page.getByTestId('titulo-depoimentos')
              
        await expect(tituloPassagens).toBeVisible()
        await expect(tituloPromocoes).toBeVisible()
        await expect(tituloDepoimentos).toBeVisible()
    })
})