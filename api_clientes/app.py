"""
Comandos para inciar projeto
pip install Flask

Criar arquivo
app.py


Falta fazer

1-Axios link externo -> Se não conseguir de placa de carro
2-Swagger -> Se der tempo
3-Adcionar um banco de dados -> Se der tempo
4-Validação de campos de cadastrar -> Se der tempo



"""
from flask import Flask, request
from db.cliente_db import Banco

app = Flask("Api_Cliente")
banco = Banco()

clientes = []

#Pagina Inicial
@app.route('/')
def index():
    return 'Hello, world!'

#Listar Clientes
@app.route("/cliente")
def listar():
    return banco.listar() ,200

#Buscar cliente ID
@app.route("/cliente/<int:id>")
def buscar(id):
    return banco.buscar(id), 200

#Cadastrar cliente
@app.route("/cliente", methods=["POST"])
def cadastrar():
    return banco.cadastrar(request.get_json()), 200

#Alterar cliente
@app.route("/cliente/<int:id>", methods=["PUT"])
def alterar(id):
    return banco.alterar(id, request.get_json()), 200

#Excluir
@app.route("/cliente/<int:id>", methods=["DELETE"])
def excluir(id):
        return banco.excluir(id), 200

app.run()