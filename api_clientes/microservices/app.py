"""
Comandos para inciar projeto
pip install Flask

Criar arquivo
app.py

Cadastrar cliente
{
		"nome": "Carlos",
		"cpf": "001.001.001-25"
}

comando para abrir o docker
docker run --rm -it -p 8080:15672 -p 5672:5672 rabbitmq:3-management
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

