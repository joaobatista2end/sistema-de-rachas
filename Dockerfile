# Usar uma imagem oficial do Node.js como base
FROM node:20

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o arquivo package.json e package-lock.json (se houver)
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante da aplicação para dentro do contêiner
COPY . .

# Expor a porta que o Fastify utiliza (por padrão, 3000)
EXPOSE 8000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
