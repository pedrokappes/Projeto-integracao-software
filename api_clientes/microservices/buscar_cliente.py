import sqlite3
from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
DATABASE = 'clientes.db'

# Configuração do Flasgger
swagger = Swagger(app)

@app.route('/clientes/<int:id>', methods=['GET'])
def buscar_cliente(id):
    """
    Busca um cliente pelo ID.

    ---
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do cliente a ser buscado
    responses:
      200:
        description: Cliente encontrado
        schema:
          type: object
          properties:
            cliente:
              type: object
              properties:
                id:
                  type: integer
                  description: ID do cliente
                nome:
                  type: string
                  description: Nome do cliente
                cpf:
                  type: string
                  description: CPF do cliente
      404:
        description: Cliente não encontrado
        schema:
          type: object
          properties:
            mensagem:
              type: string
              description: Mensagem de erro
    """
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM clientes WHERE id = ?', (id,))
    cliente = cursor.fetchone()
    db.close()
    if cliente:
        return jsonify({"cliente": cliente}), 200
    return jsonify({"mensagem": "Cliente não encontrado"}), 404

if __name__ == '__main__':
    app.run(port=5001)