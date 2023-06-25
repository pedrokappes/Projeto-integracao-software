"""
comando para abrir o docker
docker run --rm -it -p 8080:15672 -p 5672:5672 rabbitmq:3-management

comando para rodar servidor do kafka

.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
.\bin\windows\kafka-server-start.bat .\config\server.properties


Comando para inicar as aplicações

Aplicativo de python
    python app.py

Aplicativo em typescript
    npm run start

Aplicativo em C#
    dotnet watch run
"""
import sqlite3
from flask import Flask, jsonify, request
import subprocess

app = Flask("Api_Cliente")

@app.route('/')
def index():
    return 'Olá, mundo!'

if __name__ == '__main__':
    # Iniciar os outros microsserviços como processos separados
    subprocess.Popen(['python', 'listar_clientes.py'])
    subprocess.Popen(['python', 'buscar_cliente.py'])
    subprocess.Popen(['python', 'cadastrar_cliente.py'])
    subprocess.Popen(['python', 'alterar_cliente.py'])
    subprocess.Popen(['python', 'excluir_cliente.py'])
    subprocess.Popen(['python', 'enviar_clientes.py'])

    
    # Iniciar o microsserviço atual
    app.run()

