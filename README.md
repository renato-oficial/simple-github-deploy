### Gera a chave rsa
```npx git-config  -a renatoalcantara2022@gmail.com -n repo-teste```


### Configura e adiciona a  chave ssh ao deploy do github
```npx git-auth  -f /home/renato/.ssh/repo-teste -t repo-teste -p https://github.com/renato-oficial/repo-teste```


```npx git-env -f /home/renato/.ssh/repo-teste```

### list all keys
``` ssh-add -l ```


echo "# repo-teste" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:renato-oficial/repo-teste.git
git push -u origin main