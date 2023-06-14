import sqlite3
from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
DATABASE = 'clientes.db'

# Configuração do Flasgger
swagger = Swagger(app)

@app.route('/clientes/<int:id>', methods=['DELETE'])
def excluir_cliente(id):
    """
    Exclui um cliente pelo ID.

    ---
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do cliente a ser excluído
    responses:
      200:
        description: Cliente excluído com sucesso
        schema:
          type: object
          properties:
            mensagem:
              type: string
              description: Mensagem de sucesso
    """
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.execute('DELETE FROM clientes WHERE id = ?', (id,))
    db.commit()
    db.close()
    return jsonify({"mensagem": "Cliente excluído com sucesso"}), 200

if __name__ == '__main__':
    app.run(port=5004)