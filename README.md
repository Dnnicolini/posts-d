###RESUMO SOBRE O SISTEMA###

Sistema sobre posts, o usuário pode publicar e comentar postagens, basta de cadastrar.

###Tutorial para Rodar o Projeto Localmente

Este tutorial te guiará pelo processo de rodar o projeto localmente, seja utilizando Docker ou sem Docker.
Requisitos:

    Git: Para clonar o repositório.
    Docker (opcional): Caso queira rodar o projeto com Docker.
    PHP8.4(caso não utilize o docker).
    Composer (caso não utilize Docker).
    Node.js(v21.7.1) e npm(10.5)(caso não utilize Docker).
    MYSQL (caso não utilize o docker).

Passos
1. Clonar o Projeto
    
    Clone o repositório utilizando o seguinte comando:
    
        git clone <URL-DO-REPOSITORIO>
        cd <NOME-DO-DIRETORIO>

2. Instalar Dependências
    a. Com Docker (Recomendado):

      Se você possui o Docker instalado, pode utilizar o seguinte comando para instalar as dependências do Composer:

        docker run --rm \
            -u "$(id -u):$(id -g)" \
            -v "$(pwd):/var/www/html" \
            -w /var/www/html \
            laravelsail/php84-composer:latest \
            composer install --ignore-platform-reqs

   b. Sem Docker:

    Caso não tenha o Docker, instale o Composer e o PHP8.4 e execute o comando abaixo para instalar as dependências:

        composer install --ignore-platform-reqs

3. Configuração do .env
    
    Depois de instalar as dependências, copie o arquivo .env.example e renomeie para .env:

        cp .env.example .env

4. Rodar o Projeto
  a. Com Docker:
    
   Se estiver utilizando Docker, execute o seguinte comando para subir os containers:

        ./vendor/bin/sail up -d

    Gerar a key no .env:

         ./vendor/bin/sail php artisan key:generate

    Depois, rode as migrações e os seeds:

        ./vendor/bin/sail php artisan migrate --seed

    Crie o link simbólico para o armazenamento:

        ./vendor/bin/sail php artisan storage:link

    Instale as dependências do frontend com o npm:

        ./vendor/bin/sail npm install

    Por fim, inicie o processo de desenvolvimento:

        ./vendor/bin/sail npm run dev

   b. Sem Docker:

   ##Antes dos proximos passos é necessário a instalação do MYSQL na máquina, e alteração do .env conforme for necessário

   
    Gerar a key no .env:

        php artisan key:generate

    Execute as migrações e seeds:

        php artisan migrate --seed

    Crie o link simbólico:

        php artisan storage:link

    Instale as dependências do frontend com o npm:

        npm install

    Inicie o processo de desenvolvimento:

        npm run dev

6. Acessar o Projeto

    No seed temos alguns usuários caso queira acessar:

        
                'name' => 'Administrator',
                'username' => 'admin',
                'email' => 'admin@admin.com',
                'password' => password
          
                   ou
   
                'name' => 'john Doe',
                'username' => 'Johndoe',
                'email' => 'user@user.com',
                'password' => password,
             
            
   
    Agora, basta abrir o navegador e acessar o seguinte link:

        http://localhost

Isso deve carregar o seu projeto em ambiente local, qualquer dúvida me chama no linkedin: https://www.linkedin.com/in/daniele-nicolini
