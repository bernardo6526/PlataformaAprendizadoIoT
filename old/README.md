
Aplicação: Gerenciador de dispensa

Autor: Bernardo Victor de Souza e Silva

  

# Descrição da aplicação

O gerenciador de dispensa permite adicionar uma lista de itens da sua dispensa ao aplicativo para fazer o controle da mesma. Além disso é possível salvar diferentes listas de compras como por exemplo "Compra do Mês", "Churrasco", etc. Você pode adicionar itens dentro de cada lista, e marca-los quando estiver comprando os mesmos. No final, pode adicionar todos esses itens na tela de dispensa com apenas um clique!

É possível facilmente alterar e excluir todas as listas.
  
  

# Descrição de cada tela
A seguir tem a explicação de cada tela e o seu none dentro do código delimitado por ('').

  
## Dispensa ('tela2')

Nessa página é possível visualizar os produtos da dispensa. Você pode adicionar um novo produto no botão +, alterar qualquer campo do produto clicando em cima dele, ou excluir clicando no ícone da lixeira após clicar em um atributo qualquer do produto que deseja excluir.

![enter image description here](https://i.imgur.com/6FcwyLS.png) ![enter image description here](https://i.imgur.com/W6WdC11.png)


## Produtos da Compra ('tela3'):

Nessa página é possível visualizar os produtos de uma lista de compra específica. Você pode adicionar um novo produto no botão +, alterar qualquer campo do produto clicando em cima dele, ou excluir clicando no ícone da lixeira após clicar em um atributo qualquer do produto que deseja excluir. Além disso você pode salvar os produtos na dispensa, marcando no checkbox aqueles que comprou e clicando no botão enviar para dispensa.

![enter image description here](https://i.imgur.com/zNB8KyA.png)
  

## Formulário ('formulario'):

Nessa página é possível inserir dados para incluir uma nova lista de compras, ou um novo produto da compra, ou um novo produto da dispensa. Esse formulário é dinâmico, ele mostra apenas os campos necessários para tela que chamou ele. Existe um botão de incluir, que salva a informação e um de cancelar que apenas retorna a tela anterior. Além disso, existe validação dos campos. Campos vazios são marcados como vermelho e impedem a inclusão até que sejam preenchidos.

![enter image description here](https://i.imgur.com/spaCBeK.png) ![enter image description here](https://i.imgur.com/p1ZTx7V.png)
  

# Dados armazenados
A aplicação utiliza três estruturas de dados principais:

listasDeCompras[], produtosCompras[] e dispensa[]. Todas essas estruturas são listas que armazenam objetos em formato JSON. A aplicação armazena essas listas localmente para criar persistências de dados.

  

## listasDeCompras[]
Essa estrutura armazena os atributos nome(da lista de compra) e o id(gerado aleatoriamente). Essa estrutura é carregada como uma lista na tela de Listar Compras. O id dessa lista é usado pelo produtosCompras no atributo idLista para identificar os produtos pertencentes a uma lista em específico.

  

## produtosCompras[]
Essa estrutura armazena os atributos idLista(obtido a partir da lista de compras), id(gerado aleatoriamente), nome(do produto), quantidade, unidade(de medida) e check(boolean que marca se o produto foi comprado ou nao). Para exibir os produtos de uma lista em especifico, utiliza se um filtro pelo idLista correspondente. Além disso, no método para enviar produtos para dispensa, é criado um filtro utilizando o atributo check. Os produtos marcados são adicionados a estrutura de dispensa, demonstrando que foram comprados.

  

## dispensa[]:
Essa estrutura armazena os atributos idLista(obtido a partir da lista de compras), id(gerado aleatoriamente), nome(do produto), quantidade, unidade(de medida), validade (do produto). A validade é inicializada como 'yyyy-mm-dd' no caso de produtos que foram adicionados com os dados do produtosCompra. No caso de itens adicionados pelo formulario de add item na dispensa, o campo validade é preenchido com valor pelo usuario.

  
  

# Questionário:

### A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente?

R: Sim

### A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes?

R: Sim

### A aplicação armazena e usa de forma relevante dados complexos do usuário?

R: Sim

### A aplicação possui um manifesto para instalação no dispositivo do usuário?

R: Sim

### A aplicação possui um service worker que permite o funcionamento off-line?

R: Sim

### O código da minha aplicação possui comentários explicando cada operação?

R: Sim

### A aplicação está funcionando corretamente?

R: Não. Existem alguns bugs na tela de dispensa como a data aparecendo como undefined quando o usuário clica numa data pré inicializada com o valor 'yyyy-mm-dd' e não realiza a edição. Além disso existe outro bug que as vezes quando um item da dispensa é excluido, não é possível editar mais nenhum item na página. Apesar desses problemas, a aplicação funciona. O bug do undefined é mais um problema estético e o bug da edição pode ser resolvido facilmente atualizando a página.

### A aplicação está completa?

R: Não. Faltou ordenar os itens da dispensa pela data de validade e agrupar itens com mesmo nome e data de validade, somando as suas quantidades.
