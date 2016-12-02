# Chat Insper
Projeto3 Tecnologias Web

## Resumo

Esse projeto consiste de uma implementação de um chat online utilizando Node.Js como plataforma para o servidor e Socket.io para troca de sockets entre os clientes e o servidor.

## Motivação

A motivação desse projeto foi a procura de aprendizado a respeito de comunicação entre clientes conectados a um servidor em tempo real, e resposta da troca de informações em tempo real no frontend, sendo assim, um chat a solução ideal para esse aprendizado. A procura por aprendizado a respeito de front-end na atualidade também uma grande motivação, sendo usados no projeto frameworks como Bootstrap, JQuery e AngularJS.

## Instalação

Para instalar, baixe ou clone o repositório e rode o comando

```
$ node server.js
```
ou

```
$ npm start
```

## Estrutura MVC

Esse projeto busca seguir a estrutura Model, View, Controller como base de implementação. Por não se comunicar com banco de dados, não há estrutura Model no projeto. Cada uma das outras duas estruturas estão identificadas em suas respectivas pastas, sendo View todo sistema relacionado ao front-end e interação com o usuário, e Controller todo sistema que controla o servidor e requisições de socket. (Obs: Algumas funções do arquivo chat.js se encaixam como Controller, mas por conta de sua interação com o front-end e baixa compatibilidade se separadas, optou-se por mantê-las no mesmo arquivo).

## License

Esse projeto utiliza a licença MIT.
