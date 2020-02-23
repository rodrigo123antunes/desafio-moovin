# Backend Node.js <img src="https://www.moovin.com.br/assets/images/svg/logo2.svg" width="50">

### Desafio

Desenvolver uma solução em formato de API com a utilização de node.js e Typescript.

### Para iniciar você deve instalar as dependências:
```zsh
  $ npm i
```
Em seguida você poderá executar exemplos de utilização do sistema criado através do comando:
```zsh
  $ npm run dev
```

### Instruções

Em um cliente de http(Insomnia, Postman, etc) você deve fazer uma requisição do tipo ```GET```, na rota ```'/bank'``` passando os seguintes parametros:
- operation_type (saque, deposito)
- value (valor a ser depositado ou sacado)
- number_account (número da conta. Existe um número padrão, ao executar sem informar o campo, irá aparecer esse número.) 
- account_type (corrente, poupança)
