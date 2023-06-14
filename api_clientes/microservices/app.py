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
    
    # Iniciar o microsserviço atual
    app.run()

