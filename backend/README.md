# Backend E-Learning

O backend consiste em uma API REST, implementada com o NodeJS em conjunto com um banco de dados não-relacional MongoDB.
Essa etapa do trabalho ficou sob responsabilidade do aluno Augusto César Rodrigues Lima.

## Configurações de ambiente
Passo-a-passo para colocar o sistema em execução:
1) Executar uma instância do MongoDB (no ambiente de desenvolvimento foi utilizado o Docker)
2) Configurar as variáveis ambiente no arquivo .env. Foi deixado um exemplo de nome .env.example.
3) Instalar o NPM
4) Executar npm install no diretório raíz
5) Executar npm run test para conferir se o ambiente está configurado corretamente.
6) Executar npm run build para construir a API.
7) Executar npm run start para executar a API.

## Detalhes técnicos:
- Foi utilizado o framework Express.
- Foi utilizado o framework Jest para testes automatizados.
- Foi utilizado a guia de estilos do AirBnb, usando o plugin ESLint.
- Foi utilizado o Sucrase para poder executar os imports/exports no padrão ES6.
- Foi utilizado o ODM Mongoose para a conexão com o banco de dados.
- As rotas de métodos PUT e DELETE não foram implementadas, a fim de diminuir a complexidade do sistema.

## Rotas da aplicação
POST /login
POST /usuarios
 GET /usuarios/{id}
 GET /cursos
POST /cursos
 GET /cursos/:id/aulas
POST /cursos/:id/aulas 
POST /inscricao
