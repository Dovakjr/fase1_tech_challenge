## Descrição

Aplicativo de fastfood criado para entrega do fastchallenge fase 2

```bash
NOME : Mateus de Sousa Amaral
RM : 349026
Grupo: 74
```

## Instalação
É necessário possuir o Docker instalado e configurado na estação (Com o kubernets engine ativado). No projeto a versão 24.0.2 está sendo utilizada.

## Subindo a aplicação
```bash
kubectl apply -f .\app.k8sConfig.yaml 
```

O sevidor está acessível na porta 3000 como padrão.

```bash
curl localhost:3000
```
## API

### Users
<table>
<tr>
<td> Método </td> <td> EndPoint </td> <td> Descrição </td> <td> Solicitação </td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/users/id </b> </td>
<td> <b>Retorna o usuário correspondente ao ID (CPF)</b> </td>
<td>

```bash
curl localhost:3000/users/1
```

</td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/users/ </b> </td>
<td> <b>Retorna o usuário correspondente ao ID (CPF)</b> </td>
<td>

```bash
curl localhost:3000/users
```

</td>
</tr>
<tr>
<td> <b>POST</b> </td>
<td> <b>/users </b> </td>
<td> <b>cria novo usuário no sistema</b> </td>
<td>

```bash
json
{
    "cpf": "1234567",
    "name": "Mateus Amaral",
    "email": "mateus@teste.com.br"
}
```

</td>
</tr>
</table>

### Products
<table>
<tr>
<td> Método </td> <td> EndPoint </td> <td> Descrição </td> <td> Solicitação </td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/products/id </b> </td>
<td> <b> Retorna o produto correspondente ao ID</b> </td>
<td>

```bash
curl localhost:3000/products/1
```

</td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/products/ </b> </td>
<td> <b>Retorna todos os produtos cadastrados</b> </td>
<td>

```bash
curl localhost:3000/products
```

</td>
</tr>

<tr>
<td> <b>GET</b> </td>
<td> <b>/products/type/id </b> </td>
<td> <b>Retorna todos os produtos cadastrados separados por tipo.</b> </td>

<td>

```bash
curl localhost:3000/products/type/Lanche
```

</td>
</tr>

<tr>
<td> <b>POST</b> </td>
<td> <b>/products </b> </td>
<td> <b>Cria novo produto</b> </td>
<td>


```json
json
{
    "name" : "Big Mc",
    "type" : "Lanche",
    "price" : "30.50",
    "description" : "Hamburguer de duas carnes",
    "image" : "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7"
}
```

</td>
</tr>

<tr>
<td> <b>PATCH</b> </td>
<td> <b>/products/id </b> </td>
<td> <b> Atualiza os dados de um produto</b> </td>
<td>

```json
{
    "name" : "Big Tasty",
    "type" : "Lanche",
    "price" : "30.70",
    "description" : "Delicioso hamburguer de duas carnes",
    "image" : "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7"
}
```

</td>
</tr>

<tr>
<td> <b>DELETE</b> </td>
<td> <b>/products/id </b> </td>
<td> <b> Deleta um produto</b> </td>
<td>

```bash
curl localhost:3000/products/1
```

</td>
</tr>
</table>

### Orders
<table>
<tr>
<td> Método </td> <td> EndPoint </td> <td> Descrição </td> <td> Solicitação </td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/id </b> </td>
<td> <b>Retorna o pedido correspondente ao ID</b> </td>
<td>

```bash
curl localhost:3000/localhost:3000/orders/1
```

</td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/payment/id </b> </td>
<td> <b>Retorna status do pagamento na API Mercado Pago</b> </td>
<td>

```bash
curl localhost:3000/user/payment/1
```

</td>
</tr>

<tr>
<td> <b>GET</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Retorna a lista de pedidos com seus produtos correspondentes</b> </td>
<td>

```bash
curl localhost:3000/user/orders
```

</td>
</tr>

<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/all </b> </td>
<td> <b>Retrona a lista de pedidos apenas</b> </td>
<td>

```bash
curl localhost:3000/user/orders/all
```

</td>
</tr>

<tr>
<td> <b>PATCH</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Atualiza os dados de um pedido (STATUS)</b> </td>
<td>

```json
json
{
    "id": "",
    "status": "Recebido",
    "user_id": "1234567",
    "products": [
        {
            "product_id": 1,
            "quantity": 1
        },
        {
            "product_id": 2,
            "quantity": 1
        }
    ]
}
```

</td>
</tr>

<tr>
<td> <b>POST</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Cria um novo pedido</b> </td>
<td>

```json
json
{
    "status": "Em Preparação",
    "user_id": "1234567",
    "id": 1
}
```

</td>
</tr>
</table>

## Mais informações
A documentação original do event storm está disponível no [Miro](https://miro.com/app/board/uXjVM93c4vE=/)

Além disso no repositório está disponível a pasta [/docs](https://github.com/Dovakjr/fase1_tech_challenge/tree/master/docs) que contem diagramas e rascunhos usados para criação do projeto.

A estrutura geral do repositório segue o padrão da Clean Architecture implementando o framework [nestJS](https://nestjs.com/) na camada de infraestrutura. 

Abaixo detalhamento do projeto:

```code
├──docs - Documentação e diagramas
├──src 
│  ├── application/use-cases       #Camada que contém funcionalidades da aplicação isoladas por caso de uso
│  ├── Domain                      #Camada que define entidades e interfaces da aplicação
│  ├── Infrastructure              #Camada que possui detalhes de implementação das interfaces (Nest.js, HTTP, Sequelize)
│  ├── Presentations               #Cama que possui detalhes de interfaces para interação com a API (controllers & DTO)
│  └── .       
└── ...     
```