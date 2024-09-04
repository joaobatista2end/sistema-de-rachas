# Usa a imagem base do Ubuntu
FROM ubuntu:22.04

# Define o diretório de trabalho
WORKDIR /app

# Atualiza o sistema e instala dependências necessárias
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Adiciona a chave GPG oficial do MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Adiciona o repositório do MongoDB
RUN echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Atualiza a lista de pacotes e instala o MongoDB
RUN apt-get update && apt-get install -y mongodb-org

# Impede a atualização automática do MongoDB
RUN echo "mongodb-org hold" | dpkg --set-selections
RUN echo "mongodb-org-database hold" | dpkg --set-selections
RUN echo "mongodb-org-server hold" | dpkg --set-selections
RUN echo "mongodb-mongosh hold" | dpkg --set-selections
RUN echo "mongodb-org-mongos hold" | dpkg --set-selections
RUN echo "mongodb-org-tools hold" | dpkg --set-selections

# Cria o diretório de dados para o MongoDB
RUN mkdir -p /data/db

# Ajusta as permissões do diretório de dados
RUN chown -R mongodb:mongodb /data/db

# Expõe a porta padrão do MongoDB
EXPOSE 27017

# Instala o Node.js 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copia os arquivos package.json e package-lock.json (se houver) antes para aproveitar o cache
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Executa o build da aplicação
RUN npm run build

# Cria um script de inicialização para configurar o MongoDB
COPY mongod.conf /etc/mongod.conf
COPY mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js

# Comando para iniciar o MongoDB com autenticação e a aplicação
CMD mongod --auth --logpath /var/log/mongodb.log --bind_ip_all & npm start
