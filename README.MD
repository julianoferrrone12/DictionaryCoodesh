<h1 align="center">
    Online Dictionary
</h1>
<p align="center">🚀 Uma aplicação web de um dicionário online</p>

>  This is a challenge by [Coodesh](https://coodesh.com/) </br>
> [README do desafio](https://github.com/julianoferrrone12/Dictionary/blob/main/README.md)

## Dictionary API (Backend)

### 🛠 Features

As seguintes ferramentas foram usadas na construção do projeto:

- [Git](https://git-scm.com)
- [.NET](https://dotnet.microsoft.com/pt-br/download/dotnet/thank-you/sdk-8.0.303-windows-x64-installer?journey=vs-code)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Make](https://gnuwin32.sourceforge.net/packages/make.htm)

As seguintes extensões do VsCode foram usadas no desenvolvimento: 

- [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- [C# dev kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- [IntelliCode for C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp)
- [.NET Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-pack)

### ✅ Requirements

Antes de começar, é preciso que você tenha instalado as ferramentas acima e algumas é preciso ter uma atenção especial:<br />
- Já o [Make](https://gnuwin32.sourceforge.net/packages/make.htm) é preciso editar as variáveis de ambiente do seu computador e adicionar o Make como variável de sistema dentro do Path para que assim voce possa utilizá-lo via Cmd.<br />

Os demais basta seguir o passo a passo de instalação na documentação disponizada.<br />

### 🏃‍♂️ Getting Started

- Clone o repositório em sua máquina: `git clone https://github.com/julianoferrrone12/DictionaryCoodesh.git` <br />
- Na pasta em que foi clonado o repositório acesse o diretório correto: `cd DictionaryApi`.
- Com o Docker Desktop rodando em sua maquina basta rodar o comando `make infra-local` que o container do docker com sua Api estará rodando.
- Clique para acessar o [Swagger](http://localhost:8081/swagger/index.html) e utilizar a Api.
- A documentação OpenApi pode ser visualizada no arquivo `apenapi.yaml`

## Dictionary APP (Frontend)

### 🛠 Features

As seguintes ferramentas foram usadas na construção do projeto:

- [Git](https://git-scm.com)
- [React](https://react.dev)
- [Node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- [Visual Studio Code](https://code.visualstudio.com/download)

Para os ícones foi o utilizado o [Font Awesome](https://fontawesome.com)

### 🏃‍♂️ Getting Started

- ❗Caso ja tenha feito isso para o backend não precisa repetir esse passo❗<br />Clone o repositório em sua máquina: `git clone https://github.com/julianoferrrone12/DictionaryCoodesh.git` 
- Na pasta em que foi clonado o repositório acesse o diretório correto: `cd dictionary-app`.
- É necessário instalar as dependências do projeto, que são especificadas no arquivo package.json. Para isso vamos utilizar o gerenciador de pacotes Node.js, execute o comando no terminal: `npm install`. Este comando vai baixar todas as dependências necessárias para o projeto funcionar corretamente.
- Depois que as dependências estiverem instaladas, o projeto pode ser executado localmente. O comando padrão para iniciar um projeto Angular é: `npm start`. Isso irá compilar o projeto e iniciar um servidor de desenvolvimento. O terminal mostrará uma URL, geralmente http://localhost:3000/, que pode ser aberta no navegador para visualizar o aplicativo.

### Para informações técnicas do projeto desenvolvidos acessar as [Wiki Docs do repositório](https://github.com/julianoferrrone12/DictionaryCoodesh/wiki)

## 🚩 The End
