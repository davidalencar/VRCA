# VRCA
###### (Viva Real Challenge Accepted)

Esse projeto vai nos ajudar a instalar uma unidade da nossa querida VivaReal no planeta Spotippos.

Nós mapeamos todas as províncias e propriedades antigo reino de Zillia e disponibilizamos os dados através de uma API REST, onde você pode consultar informações sobre qualquer propriedade específica  ou todas as propriedades em um determinado quadrante do planeta e até mesmo registrar novas propriedades.


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
Um novo diretório chamado “VRCA” será criado e será a raiz do projeto.

- Acesse o diretório raiz do projeto e execute o seguinte comando:
```
make install
```
Um script será executado e fará a instalação de todos os módulos requiridos no projeto

#### #Configurando
Alguns passos de configuração são necessários antes de executar nossa API no ambiente de desenvolvimento ou executar as rotinas de testes.

- Criar bancos de dados separados para execução em tempo de desenvolvimento e em tempo de testes. Essa abordagem é necessária para manter os dados usados para testes consistentes.
  - Nomes sugeridos para os bancos de dados:
```
VRCA
VRCATest
```
Você pode utilizar de uma interface gráfica para mongoDB, como [roboMongo](https://robomongo.org/download), para concluir essa tarefa.


- Configurar variáveis de ambiente:

  - Localize o arquivo de configuração **__“/src/config/config.json”__** com a seguinte estrutura:
```
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
- A chave **“test”** agrupa as variáveis de ambiente que serão carregadas durante a execução dos testes.      

- A chave “development”  agrupa as variáveis de ambiente que serão carregadas durante a execução da aplicação em tempo de desenvolvimento.

- **Porta de execução:** Altere o valor da chave **__“PORT”__** para definir outra porta de execução em seu respectivo ambiente.
- **Conexão com banco de dados:** Defina o valor da chave “MONGODB_URI” com a ConnectionString do seu respectivo ambiente.

#### #Importando dados iniciais

Nosso mapeamento das províncias e propriedades do planeja  Spotippos gerou uma massa de dados que foi compilada em dois arquivos “.json”, que estão presentes no nosso projeto em “src/util/data”, que deve ser importada.

É imperativo a importação desses dados para os banco de dados antes da execução dos teste.

No diretório raiz da execute o seguinte comando:

```
make import-data
```

## Executando testes
Testes automatizados foram criados para garantir que todas as funcionalidades cumprem seu papel corretamente e continuarão cumprindo no decorrer das alterações de evolução do projeto.

Idealmente a execução desses testes fará parte de uma rotina de integração contínua.

Para executar os teste basta utilizar o comando:
```
make test
```
