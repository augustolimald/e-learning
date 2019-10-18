# Backend E-Learning

O backend consiste em uma API REST, implementada com o NodeJS em conjunto com um banco de dados não-relacional MongoDB.
Essa etapa do trabalho ficou sob responsabilidade do aluno Augusto César Rodrigues Lima.

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

## Detalhes técnicos:
- Foi utilizado o framework Express.
- Foi utilizado a guia de estilos do AirBnb com o plugin ESLint.
- Foi utilizado o Sucrase para poder executar os imports/exports no padrão ES6.
- Foi utilizado o ODM Mongoose para a conexão com o banco de dados.
- Foi utilizado autenticação JWT para segurança
- A validação foi feita usando o Joi
- A documentação foi feita usando o Swagger
- A certificação em pdf foi feita usando o PDFKit
- As rotas de métodos PUT e DELETE não foram implementadas, a fim de diminuir a complexidade do sistema.