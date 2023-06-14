import sqlite3
from flask import Flask, jsonify, request
from flasgger import Swagger

app = Flask(__name__)
DATABASE = 'clientes.db'

swagger = Swagger(app)

@app.route('/clientes/<int:id>', methods=['PUT'])
def alterar_cliente(id):
    """
    Altera um cliente existente.

    ---
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do cliente
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
      200:
        description: Cliente alterado com sucesso
      400:
        description: Dados inválidos
    """
    cliente_alterado = request.get_json()
    nome = cliente_alterado.get('nome')
    cpf = cliente_alterado.get('cpf')
    if nome and cpf:
        db = sqlite3.connect(DATABASE)
        cursor = db.cursor()
        cursor.execute('UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?', (nome, cpf, id))
        db.commit()
        db.close()
        return jsonify({"mensagem": "Cliente alterado com sucesso"}), 200
    return jsonify({"mensagem": "Dados inválidos"}), 400

if __name__ == '__main__':
    app.run(port=5003)