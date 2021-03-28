## Conceitos iniciais de uma API.

### Como executar o projeto:
-> Digito no terminal o comando yarn install para baixar todas as dependências do projeto.  
-> Digite no terminal yarn dev para executar o projeto com o nodemon.  
-> Use o Postman o Insomnia uma Aplicação Web ou até mesmo outra API para chamar as rotas do deste projeto que estão em src/routes.js.  


### Descrição do projeto:
O projeto é um pequena aplicação simulando métodos de um banco, feito com Node, utilizando a famosa biblioteca do Express e explorando algumas das funcionalidades dessa biblioteca. Nesse projeto é gerado um array que vai simular o banco de dados, onde podem ser adicionados transações tanto de depósito como de saque, atualizado dados da conta, deletado contas e listado o extrato bancário do cliente através do Insomnia ou Postman. O objetivo desse projeto é praticar os conceitos iniciais de uma API Rest, de Middlewares, de tipos de parâmetros enviados em uma requisição e de algumas bibliotecas como o Express.  

### Requisitos de software e bibliotecas:
-> Insominia ou Postman (Para testar as requisições). OBS: o Insomnia so funciona para sistemas 64bits.  
-> Node.  
-> npm ou yarn.  
-> Nodemon. (Faz a atualização automática do servidor todas vez que tivermos alteração no código)  
-> Express. (Disponibiliza incluirmos rotas na nossa aplicação e gerencia requisições de diferentes métodos HTTP de maneira fácil e eficiente)  
-> Biblioteca Uuidv4. (Cria IDs únicos e universais)  
-> Biblioteca Cors. (Segurança de acesso ao back-end)  

### Links úteis:
Documentação do Express: https://expressjs.com/pt-br/guide/routing.html  
Download do Insomnia: https://insomnia.rest/download/  
Download do Postman: https://www.postman.com/  