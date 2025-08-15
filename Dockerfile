FROM python:3.12-slim

# Evita problemas de buffering de logs
ENV PYTHONUNBUFFERED 1

# Instalar dependências do sistema para o psycopg2
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Criar diretório da aplicação
WORKDIR /app

# Instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código (mesmo que ainda não tenha nada)
COPY ./app /app
