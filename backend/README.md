# Backend E-Learning

O backend consiste em uma API REST, implementada com o NodeJS em conjunto com um banco de dados não-relacional MongoDB.

[Rotas da API](https://app.swaggerhub.com/apis-docs/Augusto9/e-learning/1.0.0)

## Configurações de ambiente
Passo-a-passo para colocar o sistema em execução:
1) Executar uma instância do MongoDB (no ambiente de desenvolvimento foi utilizado o Docker).
2) Instalar o NodeJS/NPM. [Link](https://nodejs.org/en/download/)
3) Clonar o repositório e navegar até a pasta backend.
4) Copiar o arquivo [.env.example](./.env.example) para um arquivo chamado **.env** e completar seus parâmetros.
5) Executar npm install no diretório raíz.
6) Executar npm run build para construir a API.
7) Executar npm run start para executar a API.

## Banco de Dados
O grupo optou pelo MongoDB, um banco de dados não relacional muito performático. Não existem justificativas técnicas para sua escolha no projeto em questão. Como o objetivo era desenvolver de forma ágil, ele se tornou uma boa opção, já que não necessita de criar toda uma estrutura com diversos relacionamentos assim como nos bancos relacionais.

## Detalhes técnicos:
- Foi utilizado o framework Express.
- Foi utilizado a guia de estilos do AirBnb com o plugin ESLint.
- Foi utilizado o Sucrase para poder executar os imports/exports no padrão ES6.
- Foi utilizado o ODM Mongoose para a conexão com o banco de dados.
- Foi utilizado autenticação JWT para segurança
- A validação dos dados foi feita usando o Joi
- A documentação foi feita usando o Swagger
- A certificação em pdf foi feita usando o PDFKit
- As rotas de métodos PUT e DELETE não foram implementadas, a fim de diminuir a complexidade do sistema.

## Como cadastrar um curso?
Como não foi desenvolvido uma tela para cadastro de cursos, essa funcionalidade deve ser feita diretamente pelo backend.
1) Acesse a [documentação do Swagger](https://app.swaggerhub.com/apis-docs/Augusto9/e-learning/1.0.0), você pode fazer requisições diretamente por lá utilizando o botão "Try it Out" de cada rota
2) Autentique seu usuário (rota POST /login)
3) Copie o token, clique no botão "Authorize" (canto superior direito) e cole lá
4) Faça upload da imagem (rota POST /upload) e copie o filename do retorno
5) Vá na rota "POST /courses", preencha os dados e execute a requisição. Em "image" cole o filename recebido há pouco (caso não passado, irá pegar uma imagem padrão). A quantidade de aulas, questões e opções são ilimitadas. O formato do "vídeo_url" é "https://www.youtube.com/embed/dbckIuT_YDc".
6) Caso nenhum erro recebido, acesse a aplicação e aprecie seu curso.
