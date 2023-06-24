import pika
from flask import Flask, jsonify
from flasgger import Swagger
import threading
import sqlite3

app = Flask(__name__)
swagger = Swagger(app)

def enviar_clientes():
    with app.app_context():
        # Conectar ao banco de dados
        conn = sqlite3.connect('clientes.db')
        cursor = conn.cursor()

        # Consultar os clientes no banco de dados
        cursor.execute('SELECT * FROM clientes')
        clientes = cursor.fetchall()

        # Fechar a conexão com o banco de dados
        conn.close()

        # Conectar ao RabbitMQ
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port=5672))
        channel = connection.channel()

        # Criar a fila no RabbitMQ
        channel.queue_declare(queue='clientes_queue')

        # Enviar cada cliente para a fila
        for cliente in clientes:
            # Converter o cliente para um formato adequado para envio
            cliente_data = {
                'id': cliente[0],
                'nome': cliente[1],
                'cpf': cliente[2]
            }
            channel.basic_publish(exchange='', routing_key='clientes_queue', body=str(cliente_data))

        # Fechar a conexão com o RabbitMQ
        connection.close()

        return jsonify({"mensagem": "Clientes enviados com sucesso"}), 200

@app.route('/enviar-clientes', methods=['GET'])
def enviar_clientes_handler():
    """
    Endpoint para enviar clientes para a fila do RabbitMQ
    ---
    responses:
      200:
        description: Clientes enviados com sucesso
    """
    # Executar a função enviar_clientes em uma nova thread
    thread = threading.Thread(target=enviar_clientes)
    thread.start()

    return jsonify({"mensagem": "Envio de clientes iniciado"}), 200

if __name__ == '__main__':
    app.run(port=5006)