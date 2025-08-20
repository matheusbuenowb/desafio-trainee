FROM python:3.12-slim

#Evita problemas de buffering de logs
ENV PYTHONUNBUFFERED 1

#Para instalar as dependências do sistema para o psycopg2
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

#Instalando CURL
RUN apt-get update && apt-get install -y curl

#Cria um diretório da aplicação
WORKDIR /app

#Aqui instala dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#Aqui copia o código (mesmo que ainda não tenha nada)
COPY ./backend/app /app

