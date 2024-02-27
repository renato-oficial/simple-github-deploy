## Gera a chave rsa
| Command | Description |
| ------ | ------ |
| -a | Email da conta do github |
| -n | Nome para identificação do arquivo contendo a chave |
```sh
npx git-config  -a renatoalcantara2022@gmail.com -n repo-teste
```


## Configura e adiciona a  chave ssh ao deploy do github

> Nota: Entre na sua conta do github e crie um novo repositório e copie o caminho de acesso ao mesmo.


| Command | Description |
| ------ | ------ |
| -f | Caminho com arquivo contendo a chave ssh |
| -t | Titulo para salva a chave para deploy no github |
| -p | Url contentendo o repositorio criado |

```sh
npx git-auth  -f /home/renato/.ssh/repo-teste -t repo-teste -p https://github.com/renato-oficial/repo-teste

```


## Inicia o agente SSH no ambiente do shell
| Command | Description |
| ------ | ------ |
| -f | Caminho com arquivo contendo a chave ssh |
```npx git-env -f /home/renato/.ssh/repo-teste```

## Lista todas as chaves
``` git-list ```