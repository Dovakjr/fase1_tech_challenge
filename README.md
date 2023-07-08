## Descrição

Aplicativo de fastfood criado para entrega do fastchallenge fase 1

```bash
NOME : Mateus de Sousa Amaral
RM : 349026
```

## Instalação
É necessário possuir o Docker instalado e configurado na estação. No projeto a versão 24.0.2 está sendo utilizada.


## Subindo a aplicação
```bash
docker-compose up
```

O sevidor está acessível na porta 3000 como padrão e o banco de dados na porta 3306

```bash
curl localhost:3000
curl localhost:3306
```

## Documentação
A documentação original do event storm está disponível no [Miro](https://miro.com/app/board/uXjVM93c4vE=/)

Além disso no repositório está disponível a pasta [/docs](https://github.com/Dovakjr/fase1_tech_challenge/tree/master/docs) que contem diagramas e rascunhos usados para criação do projeto.

A estrutura geral do repositório segue o padrão do [nestJS](https://nestjs.com/). Abaixo detalhamento do projeto:

```code
|--docs - Documentação e diagramas
|--src 
  |-- config - Configurações de bancos de dados
  |-- orders - Modulo relacionado a pedidos
  |-- products - Modulo relacionado a pediprodutos
  |-- users - Modulo relacionado a usuarios
  |-- app.modules.js - arquivo de entrada do servidor
|--test - Testes
```

Cada módulo possui uma estrutura como a demonstrada abaixo:

```code
|-- Modulo - Pasta da entidade de dominio
  |-- dto - Modelos de interface de dados para API
  |-- entities - Entidade pura e modelo ORM da entidade de dominio
  |-- gateways - portas e adaptadores realacionados a etidade de dominio
  |-- modulo.module.js - Modulo core que organiza a camada de serviços e o controller.
```