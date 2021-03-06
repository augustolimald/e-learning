# Sistema de E-Learning

Esse sistema foi desenvolvido com objetivos educacionais, para a disciplina Paradigmas de Linguagem de Programação, do segundo período de Sistemas de Informação pela Universidade Federal de Lavras.

## Objetivos
O objetivo é desenvolver um sistema de e-learning usando algum paradigma de programação. O grupo optou pelos paradigmas imperativo e orientado a objetos, usando a linguagem de programação Javascript.

## Motivação
A escolha da linguagem Javascript se deu pela sua crescente utilização no mercado de trabalho e pela sua versatilidade: com uma uma única linguagem de programação é possível desenvolver aplicações web, backend e frontend, mobile e desktop.
Para desenvolver o sistema, iremos utilizar o framework Express no NodeJS no lado do backend e Bootstrap no frontend, principalmente pelo domínio que os membros do grupo apresentam com tais tecnologias.

## Funcionalidades
O sistema deve apresentar as seguintes funcionalidades ao usuário:
- Cadastrar seu usuário.
- Inscrição em um curso.
- Fazer as aulas de um curso.
- Fazer o teste final de um curso.
- Gerar seu certificado, caso aprovado.

## Escopo
- Cada usuário terá nome, email e senha.
- Cada curso terá um título, várias aulas e um teste final. 
- Cada aula possui um vídeo (link para o youtube) e uma descrição textual.
- Cada teste final possui várias questões, cada uma com uma quantidade dinâmica de alternativas, sendo apenas 1 correta.
- O aluno que tiver um desempenho acima de 70% poderá solicitar seu certificado.

## Limitações
Por não ser um sistema com objetivos comerciais, diversas funções foram intencionalmente ignoradas durante o desenvolvimento. Entre elas, podemos citar:
- Alteração e deleção de usuários.
- Recuperação de Senha.
- Comunicação por email.
- Cadastro de cursos.
- Sistema de pagamentos.
- Chat entre professor e aluno.

## Divisão das tarefas
- Augusto Lima - Desenvolvimento do backend e integração front-back end
- Gabriel Franco - Desenvolvimento do Frontend
- Vinícus Carvalho - Desenvolvimento do Fronted
