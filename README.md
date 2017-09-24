app-curativoremoto

A aplicação irá armazenar seus dados usando base MongoDB. A aplicação possui quatro modelos: Lesão, Curativo, Materiais e Usuário. 
Eles são relacionados da seguinte forma:
 - Um curativo possui muitos materiais;
 - Um curativo pertence a um usuário;
 - Um curativo pertence a um tipo de Lesão;
 - Um tipo lesão possui muitos curativos;
 - Um usuário possui muitos curativos;
 
 As permissões para visualizar e cadastrar os curativos cadastrados, os tipos de materiais e as lesões são feitas somente se o usuário estiver cadastrado no sistema.

Para instalar: 
  - Acesse e clone o repositório no seguinte endereço:
  $ git clone https://github.com/rachelmsi/app-curativoremoto.git
  
  Para rodar a aplicação:
  $ cd app-curativoremoto
  $ npm install
  ...
  $ node .
  ...
  Browse your REST API at http://0.0.0.0:3000/explorer
  Web server listening at: http://0.0.0.0:3000/
  > models created sucessfully
  
  Agora acesse http://0.0.0.0:3000/ em seu navegador.  Você verá aplicação.
  
  Aplicação faz uso dos seguintes frameworks: 
   - Loopback 3.0: A estrutura LoopBack é um conjunto de módulos Node.js que você pode usar independentemente ou em conjunto para criar rapidamente as APIs REST.
   - AngularJS: uma estrutura de modelo de código aberto (MVC) de código aberto para aplicativos baseados em browser. O LoopBack fornece um SDK JavaScript AngularJS para facilitar a criação de clientes AngularJS para seus aplicativos do lado do servidor LoopBack API.
   
   Algumas informações de cadastro de materiais, lesões e curativos foram primeiramente cadastradas no lado do servidor.
   No lado do cliente, especificamente no arquivo controller.js, é feita as consultas necessárias para exibir a lista de materais, lesões, curativos cadastrados e a função para adicionar curativo. 
   No endereço http://0.0.0.0/3000/explorer é possível ver os modelos definidos e suas principais operações para criar, atualizar, deletar, inserir e consultar.
  
