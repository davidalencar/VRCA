# VRCA
###### (Viva Real Challenge Accepted)

Esse projeto vai nos ajudar a instalar uma unidade da nossa querida VivaReal no planeta Spotippos.

Nós mapeamos todas as províncias e imóveis do antigo reino de Zillia e disponibilizamos os dados através de uma API REST, onde você pode consultar informações sobre um imóvel específico ou todos os imóveis em um determinado quadrante do planeta e até mesmo registrar novos imóveis.

## Construído com:
- [express](https://github.com/expressjs/express)
- [mongoose](https://github.com/Automattic/mongoose)
- [mongodb](https://github.com/mongodb/node-mongodb-native)

## Primeiros passos

#### #Pré-requisitos
O que você precisa instalar para executar o projeto em sua máquina.

- [Node.js](https://nodejs.org/en/download/current/) (Plataforma)
- [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm) (Gerenciador de pacotes do Node.js)
- [mongoDB](https://www.mongodb.com/) (Banco de dados de documentos)


#### #Instalando
Como proceder para baixar e instalar o projeto.

- Clone o repositório para o sua maquina local:
```
git clone git@github.com:davidalencar/VRCA.git
```
Um novo diretório chamado "VRCA" será criado e será a raiz do projeto. **_(/VRCA$)_**

- Acesse **_(/VRCA$)_** e execute o seguinte comando:
```
make install
```
Um script será executado e fará a instalação de todos os módulos requiridos no projeto.

## Configurando

#### #Criar bancos de dados:

No mongoDB crie **_DOIS_** bancos de dados, um para excecução de testes e outro para ser manipulado em tempo de desenvolvimento.

```
desenvolvimento: VRCA
testes: VRCATest
```
>Você pode utilizar de uma interface gráfica para mongoDB, como [roboMongo](https://robomongo.org/download), para concluir essa tarefa.

#### #Configurar variáveis de ambiente:

Localize o arquivo de configuração **__"/src/config/config.json"__** com a seguinte estrutura:

```json
{
  "test":{
    "PORT": 3000,
    "MONGODB_URI": "mongodb://{host}:{mongodb_port}/SEU_BANCO_TEST"
  },
  "development":{
    "PORT": 3000,
    "MONGODB_URI": "mongodb://{host}:{mongodb_port}/SEU_BANCO"
  }
}
```
- **"test"** agrupa as variáveis de ambiente que serão carregadas durante a execução dos testes.      

- **"development"**  agrupa as variáveis de ambiente que serão carregadas durante a execução da aplicação em tempo de desenvolvimento.

- **"PORT"** Define uma porta de execução em seu respectivo ambiente.

- **"MONGODB_URI"** ConnectionString para o banco de dados do seu respectivo ambiente.

#### #Importando dados iniciais

Nosso mapeamento das províncias e imóveis do planeja  Spotippos gerou uma massa de dados que foi compilada em dois arquivos ".json", que estão presentes no nosso projeto em "src/util/data", que deve ser importada.

É imperativa a importação desses dados para os bancos de dados antes da execução dos testes.

Em **_(/VRCA$)_** execute o seguinte comando:

```
make import-data
```

## Executando testes
Testes automatizados foram criados para garantir que todas as funcionalidades cumpram seu papel corretamente e o continuem cumprindo no decorrer das alterações e evolução do projeto.

Idealmente a execução desses testes fará parte de uma rotina de integração contínua.

Para executar os testes basta utilizar o comando:

```
make test
```
## Rodando a aplicação
Uma vez que todas as configurações foram feitas, basta executar o comando abaixo em **_(/VRCA$)_**

```
make start
```

## Consumindo a API

> Local padrão: http://localhost:3000/ ** 3000 = PORT configurada no arquivo /src/config/config.json

#### #Registrando imóveis

Request:
```
POST /properties
```

Esperamos a seguinte estrutura para registrar um novo imóvel:

Headers

*Content-Type: "application/json"*

```json
{
  "x": 1200,
  "y": 90,
  "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "price": 100,
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "beds": 4,
  "baths": 3,
  "squareMeters": 210
}
```
Abaixo a tabela de validações sobre cada campo:

| Campo  | Requerido | Mínimo | Máximo|
| ------ | --------- |------- | ----- |
|x|Sim|0|1400|
|y|Sim|0|1000|
|title|Sim|length: 20|length: 120|
|price|Sim|0.01|n/a|
|description|Sim|length: 20|length: 255|
|beds|Sim|1|5|
|baths|Sim|1|4|
|squareMeters|Sim|20|240|

 **Resposta de sucesso -** Caso o corpo da requisição esteja correto a resposta seguirá a seguinte estrutura:

*HTTP status: 200*

 ```json
 {
    "id": 8002,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 100,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "x": 1400,
    "y": 90,
    "beds": 4,
    "baths": 3,
    "provinces": [
        "Nova"
    ],
    "squareMeters": 210
}
 ```
**Resposta de erro -** Caso o corpo da requisição contenha alguma irregularidade, a nossa resposta seguirá esse estrutura:

*HTTP status: 400*

```json
{
    "errors": {
        "x": {
            "message": "X must be less than or equal to 1400",
            "name": "ValidatorError",
            "properties": {
                "max": 1400,
                "type": "max",
                "message": "X must be less than or equal to 1400",
                "path": "x",
                "value": 1401
            },
            "kind": "max",
            "path": "x",
            "value": 1401,
            "$isValidatorError": true
        }
    },
    "_message": "Property validation failed",
    "message": "Property validation failed: x: X must be less than or equal to 1400",
    "name": "ValidationError"
}
 ```
> Exemplo em que o campo "x" ultrapassa o limite de 1400.

#### #Consultando imóveis

Na versão atual, nossa API suporta dois tipos de consultas por imóveis, que serão descritas abaixo:


**## Consulta imóvel por `id`:**

Consulta um imóvel específico a partir do seu `id`

Request:
```
GET /properties/:id
```

**Resposta de sucesso -** Caso um imóvel corresponda a pesquisa, a resposta seguirá a seguinte estrutura:

*HTTP status: 200*

```json
{
    "id": 127,
    "title": "Imóvel código 127, com 5 quartos e 4 banheiros.",
    "price": 1898000,
    "description": "Laboris qui id cupidatat sunt quis magna minim aliqua ea veniam esse consectetur esse est. Incididunt et do ullamco cupidatat adipisicing.",
    "x": 680,
    "y": 627,
    "beds": 5,
    "baths": 4,
    "provinces": [
        "Ruja"
    ],
    "squareMeters": 185
}
```

**Resposta para imóvel não encontrado -** Caso o id solicitado não exista na base, a resposta seguirá a seguinte estrutura:

*HTTP status: 404 Not Found*

*Body: Sem informações*

**## Consultar imóvel por quadrante:**

Consulta os imóveis dentro de um quadrante, que é definido a partir dos pontos A, superior direito, e B inferior esquerdo.

Na requisição os pontos A e B são representados respectivamente pelos parâmetros (ax,ay) e (bx,by).

Request:
```
GET /properties?ax={integer}&ay={integer}&bx={integer}&by={integer}
```


**Resposta de sucesso -** Caso imóveis sejam encontrados dentro dessas coordenadas, a resposta seguirá a seguinte estrutura:

*HTTP status: 200*

```json
{
    "foundProperties": 13,
    "properties": [
        {
            "id": 1184,
            "title": "Imóvel código 1184, com 5 quartos e 4 banheiros.",
            "price": 1053000,
            "description": "Aliquip dolor elit adipisicing mollit Lorem. Duis adipisicing voluptate quis amet.",
            "x": 4,
            "y": 521,
            "beds": 5,
            "baths": 4,
            "provinces": [
                "Gode"
            ],
            "squareMeters": 103
        },
        {"..."},
        {"..."}
    ]
}
```
**Resposta para nenhum imóvel encontrado -** Caso nenhum imóvel seja encontrado no quadrante:

*HTTP status: 404 Not Found*

*Body: Sem informações*

## Mantendo

Muito ainda pode ser feito para a evolução desse projeto, é importante termos alguns padrões e ferramentas para caminharmos com segurança.

#### #Documentando

Entendendo a importância de uma API bem documentada e pensando na manutenibilidade dos documentos e eficácia do processo de documentação, nós escolhemos como ferramenta da automatização a popular [jsdoc](https://www.npmjs.com/package/jsdoc).

Para recriar a documentação, basta executar o comando:

```
make document
```

#### #Padronização do código

Para nos ajudar a manter a organização e legibilidade dos códigos utilizamos a ferramenta [eslint](https://eslint.org/).

Para executar a verificação do código utilize o comando:

```
make lint
```

Alguns erros podem ser corrigidos automaticamente utilizando o comando:

```
make lint-fix
```

## Próximos passos

- Processo
  - Disponibilizar operações de alteração e exclusão de imóveis.
  - Disponibilizar operações para manutenção dos registros de províncias.
  - Controle de autenticação de usuário.


- Manutenibilidade
  - Melhorar a geração de logs.
  - Melhorar o tratamento de erros.
  - Melhorar a geração de documentação.


- Deploy
  - Containerização ([Docker](https://www.docker.com/)).

## Agradecimentos

Obrigado ${avaliador}, que com dedicação está avaliando meu esforço nesse desafio.

Obrigado a todos da equipe do Viva, que fazem parte desse processo.
