Projeto realizado em sala de aula para a disciplina de WEB III.

"Os cursos de Formação Inicial e Continuada (FIC) tem como objetivo capacitar, aperfeiçoar e atualizar o estudante que deseja entrar ou retornar ao mercado de trabalho de maneira rápida e eficiente."

O objetivo deste trabalho é realizar um sistema simples para organizar os cursos [FIC do IFPR - Campus União da Vitória](https://ifpr.edu.br/uniao-da-vitoria/formacao-inicial-e-continuada-fic/)

Nesse projeto foram utilizadas as seguintes tecnologias:
* [NestJS](https://nestjs.com/) para o backend
* [Prisma](https://www.prisma.io/) como ORM
* [SQLite](https://sqlite.org/) para permanência de dados

Para rodar o projeto utilize:\
``
npm install //para instalar depenências do NodeJs ``\
``npm run start:dev //para subir a API
``\
OBS:. É necessário ter o [Node](https://nodejs.org/pt-br) instalado na máquina.

É possível acessar a descrição das rotas pelo [Swagger](https://swagger.io/),
localhost:3000/api

## ROTAS COM ADMIN ROUTE
- POST em usuario
- POST em categoria
- UPDATE em categoria
- DELETE em categoria
para essas rotas é necessário passar *adminid* como parâmetro de headers

## ROTAS COM USER EXIST ROUTE
- addCurso em usuario
- cancelarMatricula em usuario
- addUsuario em curso
- removerUsuario em curso
para essas rotas é necessário passar *userexistid* como parâmetro de headers

## POST de USUARIO
Para o post de usuario é necessário ter os seguintes parâmetros:
- nome
- email
- tipoAcesso

ex.: 
```
POST /usuario/
headers[adminid: 3]
body
{
	"nome": "Carlos",
	"email": "carlos@gmail.com",
	"tipoAcesso": "USUARIO"
}
```

Não se passa o curso aqui, para adicionar o curso usar a rota PATCH usuario/{id_do_usuario}/addCurso/, passando cursoId no body
```
PATCH /usuario/6/addCurso
headers[userexisid: 6]
body
{
	"cursoId": 1
}
```
Ou adicionar na rota de curso, PATCH curso/{id_do_curso}/addUsuario/, passando usuarioId no body

```
PATCH /curso/2/addUsuario
headers[userexistid: 6]
body
{ 
  "usuarioId": 6
}

```
## POST de CURSO
Para o post de curso é necessário ter os seguintes parâmetros:
- titulo
- descicao
- cargaHoraria
- categoria

ex.: 

```
POST /curso/
body
{
	"titulo": "Inglês Básico",
	"descricao": "Curso de inglês nível básico",
	"cargaHoraria": 240,
	"categoria": {
		"id": 2
	}
}

```
Aqui categoria deve ser adicionada de forma explícita na criação. Diferente de usuario que pode existir sem estar matrículado em um curso, um curso DEVE ter uma categoria.

## POST de CATEGORIA
Para o post de categoria é necessário ter os seguintes parâmetros:
- nome
- descricao

ex.:

```
POST /categoria/
headers[adminid: 3]
body
{
	"nome": "Licenciatura",
	"descricao": "Cursos de licenciatura"
}

```
Não é necessário informar os cursos na criação, uma vez que categorias podem existir sem ainda não terem nenhum curso vinculados a elas.

Para adicionar cursos em categorias, utilzar a rota PATCH categoria/{id_da_categoria} passando o cursoId como parâmetro.

ex.:

```
PATCH categoria/3/
body
{
	"cursoId": 4
}
```
