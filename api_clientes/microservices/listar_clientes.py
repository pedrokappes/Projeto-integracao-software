import sqlite3
from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
DATABASE = 'clientes.db'

# Configuração do Flasgger
swagger = Swagger(app)

@app.route('/clientes', methods=['GET'])
def listar_clientes():
    """
    Lista todos os clientes.

    ---
    responses:
      200:
        description: Lista de clientes
        schema:
          type: object
          properties:
            clientes:
              type: array
              items:
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
    """
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM clientes')
    clientes = cursor.fetchall()
    db.close()
    return jsonify({"clientes": clientes}), 200

if __name__ == '__main__':
    app.run(port=5005)
