# Drogaria Tupana

Este projeto foi construído para atender a necessidade de exibir os produtos disponíveis da drogaria tupana, produtos esses que são gerenciados por seus colaboradores autorizados.

## Visão geral

### Requisitos

Os usuários não autenticados devem ser capazes de:

- Veja o layout ideal para o site, dependendo do tamanho da tela do dispositivo
- Visualizar uma vitrine dos produtos com seu título, imagem e preço.
- Visualizar a tela de login

Os usuários autenticados devem ser capazes de:

- Deslogar do sistema.
- Adicionar/Editar imagem do produto.
- Realizar as ações de Cadastrar, Listar, Atualizar e Deletar produto.
- Veja o layout ideal para o site, dependendo do tamanho da tela do dispositivo
- Realizar as ações de Cadastrar, Listar, Atualizar e Deletar categoria de produto.

### Design

Este design foi criado no figma por mim 😎 [Drogaria Tupana - UI](https://www.figma.com/file/GIHp0skarupJP1bcFwLbQ1/Drogaria-Tupana?type=design&node-id=0-1&mode=design)

### Captura de tela

<img src="./src/assets/images/screencapture.png" class="image-expansible" alt="Imagem" width="100%">

## Meu processo

### Construído com

- Vue 3
- Vue Router
- Vue Test Utils (testes unitários)
- Json Server / Json Server Auth
- Marcação HTML5 semântica
- Flexbox
- Grid Layout CSS
- ECMAScript

### O que eu aprendi

O principal aprendizado foi trabalhar com TDD (Desenvolvimento Orientado por Testes). Mesmo sendo o primeiro projeto que uso TDD já consegui sentir os benefícios na criação de componentes testaveis, manutenção fácil e refatoração sem afetar outras partes do sistema. Os estudos sobre TDD seguem firmes, pois ainda há muito a aprender.

```js
describe('TextField Component', () => {
  it('should mount the component', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should hide input when type is textarea', () => {
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        type: 'textarea'
      }
    })
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('validation span should have a capacity equal to 1 when there is an error', () => {
    const initialError = 'Campo obrigatório'
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        initialError
      }
    })

    const span = wrapper.find('span')
    const opacity = +span.element.style.opacity

    expect(opacity).toBe(1)
  })
})
```

## Configuração do projeto

```sh
npm install
```

### Api (Json Server)

Estou usando a biblioteca [Json Server](https://www.npmjs.com/package/json-server) para simular uma api, siga os próximos passos para configura-lá:

- Crie o arquivo db.json na pasta src/plugins/json-server
- Copie os valores de src/plugins/json-server/db-example.json e cole em db.json
- Api configurada! 🎉

#### Comando para iniciar a api

```sh
npm run start-json-server
```

### Compilar e carregar para desenvolvimento

```sh
npm run dev
```

### Verificação de tipo, Compilação e minificação para produção

```sh
npm run build
```

### Executar testes unitários com [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint com [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Autor

- Website - [Ailson Feitosa](https://github.com/ailson12)
- LinkedIn - [Ailson Feitosa](https://www.linkedin.com/in/ailson-feitosa)
- Instagram - [Ailson Feitosa](https://www.instagram.com/roberto_feitosa06)
