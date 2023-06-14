import sqlite3
from flask import Flask, jsonify, request
from flasgger import Swagger

app = Flask(__name__)
DATABASE = 'clientes.db'

swagger = Swagger(app)

@app.route('/clientes', methods=['POST'])
def cadastrar_cliente():
    """
    Cadastra um novo cliente.

    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            nome:
              type: string
              description: Nome do cliente
            cpf:
              type: string
              description: CPF do cliente
    responses:
      201:
        description: Cliente cadastrado com sucesso
      400:
        description: Dados inválidos
    """
    cliente = request.get_json()
    nome = cliente.get('nome')
    cpf = cliente.get('cpf')
    if nome and cpf:
        db = sqlite3.connect(DATABASE)
        cursor = db.cursor()
        cursor.execute('INSERT INTO clientes (nome, cpf) VALUES (?, ?)', (nome, cpf))
        db.commit()
        db.close()
        return jsonify({"mensagem": "Cliente cadastrado com sucesso"}), 201
    return jsonify({"mensagem": "Dados inválidos"}), 400

if __name__ == '__main__':
    app.run(port=5002)
